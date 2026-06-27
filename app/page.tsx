import {
  CategoryMenu,
  Hero,
  IntroducingSection,
  ProductsSection,
} from "@/components";
import Link from "next/link";
import { FiStar, FiShield, FiCheckCircle } from "react-icons/fi";

/* ── Static testimonials ── */
const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Verified Buyer",
    text: "I love that I can see the AI analysis for every review. It helped me avoid a product with tons of fake 5-star reviews. Game changer!",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Tech Enthusiast",
    text: "Finally a shopping platform that's transparent about review quality. The authenticity scores are spot on — I trust my purchases now.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Regular Shopper",
    text: "The AI badge on reviews is brilliant. Caught three fake reviews on a product I was about to buy. Saved me $400!",
    rating: 5,
  },
];

/* ── Platform stats strip ── */
const STATS = [
  { label: "Products Listed", value: "500+" },
  { label: "Reviews Analyzed", value: "10,000+" },
  { label: "Fake Reviews Caught", value: "847" },
  { label: "Happy Shoppers", value: "3,800+" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <IntroducingSection />
      <CategoryMenu />
      <ProductsSection />

      {/* Platform stats */}
      <section className="py-16 bg-blue-600">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  {s.value}
                </p>
                <p className="text-blue-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Reviews
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              What our customers say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-premium p-6 flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className="text-sm text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <FiCheckCircle className="text-green-500" /> {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-4">
            <FiShield /> AI-Verified Reviews
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Ready to shop smarter?
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
            Join thousands of shoppers who use TrustShop to make confident,
            informed buying decisions backed by AI.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/shop" className="btn-primary-custom inline-flex items-center gap-2">
              Start Shopping
            </Link>
            <Link href="/register" className="btn-secondary-custom inline-flex items-center gap-2">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
