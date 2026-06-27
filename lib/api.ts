/**
 * Central API base URL configuration.
 * - In production: reads from NEXT_PUBLIC_API_URL env var (your Render backend)
 * - In development: falls back to localhost:3001
 */
export const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window === "undefined"
        ? "API_BASE"
        : "API_BASE");
