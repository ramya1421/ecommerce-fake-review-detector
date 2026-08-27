# ─────────────────────────────────────────────────────────────────────────────
# TrustShop — Express Backend
# Multi-stage build: deps → runner
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# openssl required by Prisma
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev

# Generate Prisma client in the deps stage
RUN npx prisma generate

# ── Stage 2: production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy deps + generated Prisma client
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copy application source
COPY --chown=expressjs:nodejs . .

USER expressjs

EXPOSE 3001
ENV PORT=3001

# Run migrations then start the Express server
# Using sh -c so we can chain commands
CMD sh -c "npx prisma migrate deploy && node app.js"
