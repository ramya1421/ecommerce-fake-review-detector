"use client";
import { API_BASE } from "@/lib/api";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiPlus, FiBox, FiSearch, FiMoreHorizontal } from "react-icons/fi";

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/products?mode=admin`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FiBox className="text-blue-600" /> Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {products.length} products total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 btn-primary-custom text-sm"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search products..."
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
                  Product
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                  Stock
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Price
                </th>
                <th className="py-3 px-5 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={nanoid()} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5">
                      <input type="checkbox" className="checkbox w-4 h-4" />
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            src={
                              product?.mainImage
                                ? `/${product?.mainImage}`
                                : "/product_placeholder.jpg"
                            }
                            alt={product?.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 line-clamp-1">
                            {product?.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            {product?.manufacturer}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 hidden md:table-cell">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product?.inStock
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-500"
                          }`}
                      >
                        {product?.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-5 font-bold text-slate-900">
                      ${product?.price}
                    </td>
                    <td className="py-3 px-5">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        aria-label="Product details"
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
  );
};

export default DashboardProductTable;
