import Link from "next/link";
import React from "react";
import { FiHome, FiChevronRight } from "react-icons/fi";

const Breadcrumb = () => {
  return (
    <nav
      className="flex items-center gap-1.5 text-sm py-5 mb-2"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors font-medium"
      >
        <FiHome className="text-xs" /> Home
      </Link>
      <FiChevronRight className="text-slate-300 text-xs" />
      <Link
        href="/shop"
        className="text-slate-500 hover:text-blue-600 transition-colors font-medium"
      >
        Shop
      </Link>
      <FiChevronRight className="text-slate-300 text-xs" />
      <span className="text-slate-800 font-semibold">All Products</span>
    </nav>
  );
};

export default Breadcrumb;
