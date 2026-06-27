"use client";
import React, { useState } from "react";
import ReviewSection from "./ReviewSection";
import { FiFileText, FiInfo, FiMessageSquare } from "react-icons/fi";

// formatCategoryName utility inline to avoid import issues
const formatCategoryName = (name: string): string => {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TABS = [
  { id: 0, label: "Description", icon: FiFileText },
  { id: 1, label: "Additional Info", icon: FiInfo },
  { id: 2, label: "Reviews", icon: FiMessageSquare },
];

const ProductTabs = ({ product }: { product: Product }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="section-container">
      {/* Tab nav */}
      <div className="flex gap-1 border-b border-slate-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${currentTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
          >
            <tab.icon className="text-sm" />
            {tab.label}
            {tab.id === 2 && (
              <span className="ml-1 text-[10px] bg-blue-100 text-blue-600 font-bold px-1.5 py-0.5 rounded-full">
                AI
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {/* Description */}
        {currentTab === 0 && (
          <div className="max-w-2xl">
            <p className="text-slate-600 text-base leading-relaxed">
              {product?.description || "No description available for this product."}
            </p>
          </div>
        )}

        {/* Additional Info */}
        {currentTab === 1 && (
          <div className="card-premium p-0 overflow-hidden max-w-lg">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Manufacturer", value: product?.manufacturer || "N/A" },
                  {
                    label: "Category",
                    value: product?.category?.name
                      ? formatCategoryName(product.category.name)
                      : "Uncategorized",
                  },
                  { label: "SKU", value: "ABCCD-18" },
                  { label: "Colors", value: "Silver, Slate, Blue" },
                  {
                    label: "Availability",
                    value: product?.inStock ? "In Stock" : "Out of Stock",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                  >
                    <td className="px-5 py-3 font-semibold text-slate-700 w-40">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews — AI-powered detection displayed here */}
        {currentTab === 2 && (
          <ReviewSection productId={product.id} />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
