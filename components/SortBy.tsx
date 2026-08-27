"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";
import { FiChevronsUpDown } from "react-icons/fi";

const SortBy = () => {
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex items-center gap-2">
      <FiChevronsUpDown className="text-slate-400 text-sm flex-shrink-0" />
      <select
        value={sortBy}
        onChange={(e) => changeSortBy(e.target.value)}
        className="text-sm text-slate-700 font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
        name="sort"
      >
        <option value="defaultSort">Default Sort</option>
        <option value="titleAsc">Name A → Z</option>
        <option value="titleDesc">Name Z → A</option>
        <option value="lowPrice">Price: Low to High</option>
        <option value="highPrice">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortBy;
