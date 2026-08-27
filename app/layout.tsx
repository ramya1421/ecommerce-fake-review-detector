import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrustShop — Smart Review Detection E-Commerce",
    template: "%s | TrustShop",
  },
  description:
    "Shop smarter with TrustShop. Every product review is analyzed for authenticity so you always know what's real.",
  keywords: [
    "fake review detection",
    "smart shopping",
    "authentic reviews",
    "ecommerce",
    "trust",
  ],
  openGraph: {
    title: "TrustShop — Shop Smarter",
    description:
      "Every review on TrustShop is analyzed for authenticity. Buy with confidence.",
    type: "website",
    locale: "en_US",
    siteName: "TrustShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustShop — Smart Review Detection",
    description: "Shop smarter. Every review analyzed for authenticity.",
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
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <body
        className={`${inter.className} bg-[#F8FAFC] text-slate-900 antialiased`}
      >
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
