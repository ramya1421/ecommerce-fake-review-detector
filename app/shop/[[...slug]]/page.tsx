export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Breadcrumb, Filters, Pagination, Products, SortBy } from "@/components";
import React from "react";

const improveCategoryText = (text: string): string => {
  if (text?.indexOf("-") !== -1) {
    return text.split("-").join(" ");
  }
  return text ?? "";
};

const ShopPage = (slug: any) => {
  const categoryName =
    slug?.params?.slug && slug?.params?.slug[0]?.length > 0
      ? improveCategoryText(slug?.params?.slug[0])
      : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="section-container py-8">
        <Breadcrumb />

        <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start">
          {/* Filters sidebar */}
          <div className="md:sticky md:top-24">
            <Filters />
          </div>

          {/* Main content */}
          <div>
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 capitalize">
                  {categoryName ?? "All Products"}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing results with AI-verified review scores
                </p>
              </div>
              <SortBy />
            </div>

            {/* Products grid */}
            <Products slug={slug} />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
