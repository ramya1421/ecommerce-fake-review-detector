import { API_BASE } from "@/lib/api";
import React from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const ProductsSection = async () => {
  let products: Product[] = [];
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      next: { revalidate: 60 },
    });
    if (res.ok) products = await res.json();
  } catch (_) {
    // backend may be offline in dev; show empty gracefully
  }

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Trending
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all <FiArrowRight />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">No products available right now.</p>
            <p className="text-sm mt-1">Start your backend server to load products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.slice(0, 8).map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 btn-primary-custom"
          >
            Browse All Products <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
