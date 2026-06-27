import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShoppingBag, FiArrowRight, FiShield, FiStar, FiZap } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-2xl" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative section-container py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div className="flex flex-col gap-6 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 w-fit">
              <FiShield className="text-green-300 text-sm" />
              <span className="text-white text-xs font-semibold tracking-wide uppercase">
                AI-Powered Review Detection
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Shop Smarter with{" "}
              <span className="bg-gradient-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent">
                AI‑Powered
              </span>{" "}
              Fake Review Detection
            </h1>

            {/* Subtitle */}
            <p className="text-blue-100 text-lg leading-relaxed max-w-xl">
              Every review on TrustShop is analyzed in real‑time by our AI model.
              See authenticity scores, confidence ratings, and spam probabilities
              — so you always know what's real.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 active:scale-[.98] transition-all duration-200 shadow-lg shadow-blue-900/20"
              >
                <FiShoppingBag className="text-lg" />
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/20 active:scale-[.98] transition-all duration-200"
              >
                Explore Products
                <FiArrowRight />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-white/10">
              {[
                { label: "Products", value: "500+" },
                { label: "Reviews Analyzed", value: "10K+" },
                { label: "Fake Detected", value: "98%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-blue-200 text-xs font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero image / illustration */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 to-teal-400/30 rounded-3xl blur-2xl scale-110" />

              {/* Product card mock-up */}
              <div className="relative glass-card p-6 max-w-sm w-full">
                <Image
                  src="/watch for banner.png"
                  width={320}
                  height={320}
                  alt="Featured product — smart watch"
                  className="w-64 h-64 object-contain mx-auto drop-shadow-2xl"
                  priority
                />

                {/* AI badge overlay */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-200/50 p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <FiShield className="text-green-600 text-base" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-700">AI Verified — Genuine</p>
                    <p className="text-xs text-slate-500">Authenticity score: 94%</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "94%" }} />
                    </div>
                  </div>
                </div>

                {/* Rating row */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar key={s} className={`text-sm ${s <= 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`} />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">4.0 (128 reviews)</span>
                  </div>
                  <span className="text-blue-600 font-bold text-sm">$299</span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-card px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-100">
                <FiZap className="text-amber-500" /> Live AI Analysis
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-card px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Reviews Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
