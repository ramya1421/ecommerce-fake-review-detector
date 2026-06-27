import { API_BASE } from "@/lib/api";
import { ProductItem } from "@/components";
import React from "react";
import { FiSearch, FiPackage } from "react-icons/fi";
import Link from "next/link";

interface Props {
  searchParams: { search: string };
}

const SearchPage = async ({ searchParams: { search } }: Props) => {
  let products: Product[] = [];
  try {
    const res = await fetch(
      `${API_BASE}/api/search?query=${search || ""}`,
      { cache: "no-store" }
    );
    if (res.ok) products = await res.json();
  } catch (_) {
    // backend offline
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-10">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-2">
            <FiSearch className="text-white text-xl" />
            <h1 className="text-3xl font-extrabold text-white">
              Search Results
            </h1>
          </div>
          {search && (
            <p className="text-blue-200 text-sm">
              Showing results for{" "}
              <span className="font-bold text-white">
                &ldquo;{search}&rdquo;
              </span>
              {products.length > 0 && (
                <span className="ml-2">
                  — {products.length} product
                  {products.length !== 1 ? "s" : ""} found
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="section-container py-10">
        {products.length === 0 ? (
          <div className="card-premium p-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-3xl text-slate-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              No products found
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {search
                ? `We couldn't find anything matching "${search}". Try a different search term.`
                : "Enter a search term to find products."}
            </p>
            <Link href="/shop" className="btn-primary-custom inline-flex items-center gap-2">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
