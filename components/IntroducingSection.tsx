import Link from "next/link";
import React from "react";
import { FiShield, FiTrendingUp, FiZap, FiAward } from "react-icons/fi";

const FEATURES = [
  {
    icon: FiShield,
    title: "AI Authenticity Check",
    desc: "Every review analyzed instantly for fake patterns, spam, and bot activity.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: FiTrendingUp,
    title: "Real-time Scoring",
    desc: "Confidence scores and authenticity ratings shown right next to each review.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FiZap,
    title: "Instant Detection",
    desc: "Our model flags suspicious reviews before you make a purchase decision.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: FiAward,
    title: "Verified Purchases",
    desc: "Verified buyer badges and review quality scores for full transparency.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const IntroducingSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Headline */}
        <div className="text-center mb-14 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Why TrustShop
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            The only e-commerce platform <br className="hidden sm:block" />
            where every review is{" "}
            <span className="text-blue-600">AI‑verified</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            We built TrustShop because fake reviews cost consumers billions every
            year. Our AI model catches them before they influence your buying
            decisions.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-premium p-6 flex flex-col gap-3 animate-slide-up"
            >
              <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center`}>
                <f.icon className={`text-xl ${f.color}`} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <div className="relative">
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-3">
              Start Shopping Smarter Today
            </h3>
            <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">
              Browse thousands of products — each with transparent, AI‑verified review scores.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroducingSection;
