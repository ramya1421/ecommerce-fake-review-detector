<div align="center">

# 🛡️ TrustShop

### *Shop smarter. Every review analyzed for authenticity in real time.*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_TrustShop-6366f1?style=for-the-badge)](https://ecommerce-fake-review-detector.vercel.app)
[![Demo Video](https://img.shields.io/badge/🎬_Demo_Video-Watch_Now-ef4444?style=for-the-badge)](https://docs.google.com/videos/d/1Uz7ThexL7Eq_l3rHu4hhp0ml8xQJvXKCM3Wgp61Im78/play?usp=sharing)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![License](https://img.shields.io/badge/License-MIT-22c55e)](LICENSE)

<br/>

> **TrustShop** is a full-stack e-commerce platform with an integrated fake review detection engine.  
> Every review is scored for **authenticity**, **confidence**, and **spam probability** — in real time.

</div>

---

## 🎬 Demo

<div align="center">

**[▶ Watch the Full Demo Video](https://docs.google.com/videos/d/1Uz7ThexL7Eq_l3rHu4hhp0ml8xQJvXKCM3Wgp61Im78/play?usp=sharing)**

*See fake review detection, the admin dashboard, and the full shopping flow in action.*

</div>

---

## 🚀 Live Deployment

| Service | URL | Platform |
|:--------|:----|:---------|
| 🌐 **Frontend** | [ecommerce-fake-review-detector.vercel.app](https://ecommerce-fake-review-detector.vercel.app) | Vercel |
| ⚙️ **Backend API** | Deployed on Render | Render |
| 🗄️ **Database** | Hosted MySQL | Railway |

---

## ✨ Features at a Glance

<table>
<tr>
<td width="33%" valign="top">

### 🛍️ Customer Store
- Modern landing page with hero, categories & testimonials
- Product catalog with filters, sort, search & pagination
- Shopping cart & multi-step checkout
- Wishlist & email/password authentication

</td>
<td width="33%" valign="top">

### 🔍 Fake Review Detection
- Real-time heuristic analysis on every review
- **Authenticity score** progress bar
- **Confidence %** rating
- **Spam probability** indicator
- 🟢 Genuine / 🔴 Fake badge per review

</td>
<td width="33%" valign="top">

### 🛠️ Admin Dashboard
- Stats: revenue, orders, users, genuine vs fake reviews
- Revenue chart & review quality visualization
- Full CRUD — products, orders, users, categories
- Review moderation panel

</td>
</tr>
</table>

---

## 🏗️ Architecture

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
              │   MySQL         │
              │  (Railway +     │
              │   Prisma ORM)   │
              └─────────────────┘
```

---

## 🧰 Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript |
| **Styling** | Tailwind CSS 3, DaisyUI 4 |
| **State Management** | Zustand 4 |
| **Authentication** | NextAuth v4 |
| **Backend** | Express.js (Node.js) |
| **ORM** | Prisma 5 |
| **Database** | MySQL |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |
| **Database Hosting** | Railway |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MySQL database

### 1. Clone the repo

```bash
git clone https://github.com/ramya1421/ecommerce-fake-review-detector.git
cd ecommerce-fake-review-detector
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 3. Configure environment variables

**Root `.env`:**
```env
DATABASE_URL="mysql://user:password@host:port/dbname"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

**Server `.env`:**
```env
DATABASE_URL="mysql://user:password@host:port/dbname"
PORT=3001
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

---

## ▶️ Running Locally

```bash
# Terminal 1 — start the backend
cd server
node app.js

# Terminal 2 — start the frontend
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Deployment Guide

| Service | Platform | Notes |
|:--------|:---------|:------|
| Frontend | **Vercel** | Connect GitHub repo, add env vars in dashboard |
| Backend | **Render** | Root dir: `server/`, start command: `node app.js` |
| Database | **Railway** | Provision MySQL, copy connection string to `.env` |

---

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|:---------|:--------:|:------------|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `NEXTAUTH_SECRET` | ✅ | JWT signing secret |
| `NEXTAUTH_URL` | ✅ | Full base URL of the app |
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL |

---

## 📁 Folder Structure

```
ecommerce-fake-review-detector/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/admin/  # Admin panel routes
│   ├── api/                # Next.js API routes
│   ├── _zustand/           # Zustand state stores
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

## 📄 License

[MIT](LICENSE) — feel free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ by [ramya1421](https://github.com/ramya1421)

⭐ **Star this repo if you found it useful!**

</div>
