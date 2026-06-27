import Link from "next/link";
import React from "react";
import { FiShield, FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowRight, FiGrid } from "react-icons/fi";

const LINKS = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "New Arrivals", href: "/shop" },
    { name: "Best Sellers", href: "/shop" },
    { name: "Discounts", href: "/shop" },
  ],
  company: [
    { name: "About TrustShop", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="section-container pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FiGrid className="text-white text-sm" />
              </div>
              <span className="font-extrabold text-white text-xl">
                Trust<span className="text-blue-400">Shop</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              The world's first e-commerce platform with built-in AI fake review
              detection. Shop with confidence.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 text-sm bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                aria-label="Subscribe"
                className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
              >
                <FiArrowRight className="text-white text-sm" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FiShield className="text-green-400" />
            <span>All reviews powered by AI authenticity detection</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiGithub, href: "https://github.com", label: "GitHub" },
              { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
              { icon: FiMail, href: "mailto:support@trustshop.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-200"
              >
                <s.icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} TrustShop. Built with AI-powered fake review detection.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
