"use client";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = () => {
  const { page, incrementPage, decrementPage } = usePaginationStore();

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      <button
        onClick={() => decrementPage()}
        disabled={page <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <FiChevronLeft className="text-sm" />
      </button>

      {/* Page numbers */}
      {[Math.max(1, page - 1), page, page + 1].map((p) => (
        <button
          key={p}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${p === page
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => incrementPage()}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
        aria-label="Next page"
      >
        <FiChevronRight className="text-sm" />
      </button>
    </div>
  );
};

export default Pagination;
