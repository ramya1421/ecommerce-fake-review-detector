# TrustShop — Fake Review Detection E-Commerce Platform

> Shop smarter. Every review analyzed for authenticity in real time.

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://prisma.io)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

**TrustShop** is a full-stack e-commerce platform with an integrated fake review detection system. Every product review is analyzed in real time and displayed with authenticity scores, confidence ratings, and spam probability — giving shoppers full transparency before making a purchase.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│               Frontend (Next.js 14)                 │
│  Customer Store │ Admin Dashboard │ Review Analysis │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┴───────────────┐
        │                              │
┌───────▼──────────┐     ┌────────────▼────────────┐
│  Next.js API     │     │  Express.js Backend      │
│  /api/product    │     │  /api/products           │
│  /api/register   │     │  /api/reviews            │
│  /api/auth/...   │     │  /api/orders  etc.       │
└───────┬──────────┘     └────────────┬────────────┘
        └──────────────┬──────────────┘
                       │
              ┌────────▼────────┐
              │   MySQL (Railway│
              │   via Prisma)   │
              └─────────────────┘
```

---

## Features

### Customer-Facing
- Modern landing page with hero, categories, featured products, testimonials
- **Fake Review Detection UI** — authenticity score, confidence %, spam probability per review
- Product catalog with filters, sort, search, pagination
- Shopping cart, multi-step checkout, wishlist
- Email/password authentication

### Admin Dashboard
- Stats cards (revenue, orders, users, genuine vs fake reviews)
- Revenue chart, review quality visualization
- Full CRUD for products, orders, users, categories

### Fake Review Detection
- Rule-based heuristic detection on every submitted review
- `isFake` flag stored per review in database
- Visual progress bars for authenticity, confidence, and spam scores
- Green "Genuine" / Red "Fake" badges per review

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS 3, DaisyUI 4 |
| State | Zustand 4 |
| Auth | NextAuth v4 |
| Backend | Express.js (Node) |
| ORM | Prisma 5 |
| Database | MySQL |
| Deployment — Frontend | Vercel |
| Deployment — Backend | Render |
| Deployment — Database | Railway |

---

## Installation

### Prerequisites
- Node.js 18+
- MySQL database

### 1. Clone

```bash
git clone https://github.com/ramya1421/ecommerce-fake-review-detector.git
cd ecommerce-fake-review-detector
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Environment variables

Root `.env`:
```env
DATABASE_URL="mysql://user:password@host:port/dbname"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Server `.env`:
```env
DATABASE_URL="mysql://user:password@host:port/dbname"
PORT=3001
```

### 5. Database setup

```bash
npx prisma generate
npx prisma db push
```

---

## Running Locally

```bash
# Terminal 1 — backend
cd server
node app.js

# Terminal 2 — frontend
npm run dev
```

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Connect GitHub repo, add env vars |
| Backend | Render | Root dir: `server/`, start: `node app.js` |
| Database | Railway | MySQL, copy connection string |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `NEXTAUTH_SECRET` | ✅ | JWT signing secret |
| `NEXTAUTH_URL` | ✅ | Full base URL of the app |
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL |

---

## Folder Structure

```
ecommerce-fake-review-detector/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/admin/  # Admin panel
│   ├── api/                # Next.js API routes
│   ├── _zustand/           # State stores
│   └── ...                 # All page routes
├── components/             # Reusable React components
├── server/                 # Express.js backend
│   ├── routes/             # API route handlers
│   ├── prisma/             # Server Prisma schema
│   └── app.js              # Entry point
├── prisma/                 # Frontend Prisma schema
├── lib/                    # Utilities and helpers
├── public/                 # Static assets
└── utils/                  # Shared utilities
```

---

## License

[MIT](LICENSE)
