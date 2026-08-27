# ─────────────────────────────────────────────────────────────────────────────
# TrustShop — Next.js Frontend
# Multi-stage build: deps → builder → runner
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Install only what's needed to run npm install
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install all deps (including devDeps needed for the build)
RUN npm ci

# ── Stage 2: build the Next.js app ───────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

# Copy deps from stage 1
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copy the rest of the source
COPY . .

# Generate Prisma client then build Next.js
# Build-time env vars — NEXT_PUBLIC_* must be baked in at build time
# Pass them via --build-arg in docker build or set them in Render's build config
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Dummy values for build-time only — real secrets are injected at runtime
ENV NEXTAUTH_SECRET=build-time-placeholder
ENV NEXTAUTH_URL=http://localhost:3000
ENV DATABASE_URL=mysql://build:build@localhost:3306/build

RUN npx prisma generate
RUN npm run build

# ── Stage 3: production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only the files needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy the standalone Next.js output (requires output: 'standalone' in next.config)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run migrations then start the server
CMD ["node", "server.js"]
