"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import { FiSliders, FiX } from "react-icons/fi";

interface InputCategory {
  inStock: { text: string; isChecked: boolean };
  outOfStock: { text: string; isChecked: boolean };
  priceFilter: { text: string; value: number };
  ratingFilter: { text: string; value: number };
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page } = usePaginationStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 3000 },
    ratingFilter: { text: "rating", value: 0 },
  });
  const { sortBy } = useSortStore();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Availability */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
          Availability
        </h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative w-4 h-4 flex-shrink-0">
              <input
                type="checkbox"
                checked={inputCategory.inStock.isChecked}
                onChange={() =>
                  setInputCategory({
                    ...inputCategory,
                    inStock: {
                      text: "instock",
                      isChecked: !inputCategory.inStock.isChecked,
                    },
                  })
                }
                className="checkbox w-4 h-4"
              />
            </div>
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
              In Stock
            </span>
            <span className="ml-auto text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Available
            </span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative w-4 h-4 flex-shrink-0">
              <input
                type="checkbox"
                checked={inputCategory.outOfStock.isChecked}
                onChange={() =>
                  setInputCategory({
                    ...inputCategory,
                    outOfStock: {
                      text: "outofstock",
                      isChecked: !inputCategory.outOfStock.isChecked,
                    },
                  })
                }
                className="checkbox w-4 h-4"
              />
            </div>
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
              Out of Stock
            </span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Price */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Max Price
          </h3>
          <span className="text-sm font-bold text-blue-600">
            ${inputCategory.priceFilter.value}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={3000}
          step={10}
          value={inputCategory.priceFilter.value}
          className="range w-full"
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              priceFilter: { text: "price", value: Number(e.target.value) },
            })
          }
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>$0</span>
          <span>$3,000</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Rating */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Min Rating
          </h3>
          <span className="text-sm font-bold text-blue-600">
            {inputCategory.ratingFilter.value}★
          </span>
        </div>
        <input
          type="range"
          min={0}
          max="5"
          value={inputCategory.ratingFilter.value}
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              ratingFilter: { text: "rating", value: Number(e.target.value) },
            })
          }
          className="range range-info w-full"
          step="1"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1 px-0.5">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setInputCategory({
            inStock: { text: "instock", isChecked: true },
            outOfStock: { text: "outofstock", isChecked: true },
            priceFilter: { text: "price", value: 3000 },
            ratingFilter: { text: "rating", value: 0 },
          })
        }
        className="w-full text-sm text-slate-500 hover:text-slate-700 font-medium py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
      >
        <FiX className="text-xs" /> Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        className="md:hidden flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors mb-4"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <FiSliders /> Filters
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden card-premium p-4 mb-4 animate-fade-in">
          <FilterContent />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block card-premium p-5">
        <div className="flex items-center gap-2 mb-5">
          <FiSliders className="text-blue-600 text-sm" />
          <h2 className="font-bold text-slate-800 text-sm">Filters</h2>
        </div>
        <FilterContent />
      </div>
    </>
  );
};

export default Filters;
