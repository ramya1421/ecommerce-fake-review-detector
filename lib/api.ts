/**
 * Central API base URL configuration.
 * - In production: reads from NEXT_PUBLIC_API_URL env var (your Render backend)
 * - In development: falls back to http://localhost:3001
 *
 * NEXT_PUBLIC_API_URL must be set in your Vercel environment variables before deploying.
 */
export const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window === "undefined"
        ? "http://localhost:3001"  // SSR / server-side fallback
        : "http://localhost:3001"); // Client-side fallback
