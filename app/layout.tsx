import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import "svgmap/dist/svgMap.min.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrustShop — AI-Powered Fake Review Detection",
    template: "%s | TrustShop",
  },
  description:
    "Shop smarter with TrustShop. Our AI instantly analyzes every product review for authenticity — so you always know what's real.",
  keywords: [
    "fake review detection",
    "AI shopping",
    "authentic reviews",
    "ecommerce",
    "trust",
  ],
  openGraph: {
    title: "TrustShop — Shop Smarter with AI",
    description:
      "Every review on TrustShop is analyzed by AI for authenticity. Buy with confidence.",
    type: "website",
    locale: "en_US",
    siteName: "TrustShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustShop — AI-Powered Fake Review Detection",
    description: "Shop smarter. Every review analyzed by AI for authenticity.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <body className={`${inter.className} bg-[#F8FAFC] text-slate-900 antialiased`}>
        <SessionProvider session={session}>
          <Header />
          <Providers>
            <main className="min-h-screen">{children}</main>
          </Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
