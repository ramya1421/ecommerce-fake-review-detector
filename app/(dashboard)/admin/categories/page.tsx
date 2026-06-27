"use client";
import { API_BASE } from "@/lib/api";
import { DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTag, FiSearch, FiMoreHorizontal } from "react-icons/fi";

const formatCategoryName = (name: string): string => {
  if (!name) return "";
  return name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <FiTag className="text-blue-600" /> Categories
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {categories.length} categories total
            </p>
          </div>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 btn-primary-custom text-sm"
          >
            <FiPlus /> Add Category
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium pl-10"
          />
        </div>

        {/* Table */}
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 w-8">
                    <input type="checkbox" className="checkbox w-4 h-4" />
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Category Name
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">
                    Slug
                  </th>
                  <th className="py-3 px-5 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400 text-sm">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filtered.map((category: Category) => (
                    <tr key={nanoid()} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-5">
                        <input type="checkbox" className="checkbox w-4 h-4" />
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FiTag className="text-blue-600 text-xs" />
                          </div>
                          <span className="font-medium text-slate-800">
                            {formatCategoryName(category?.name)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-5 hidden sm:table-cell">
                        <span className="font-mono text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                          {category?.name}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <Link
                          href={`/admin/categories/${category?.id}`}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                          aria-label="Category details"
                        >
                          <FiMoreHorizontal className="text-base" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;
