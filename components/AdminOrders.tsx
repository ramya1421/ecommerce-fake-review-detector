"use client";

import { API_BASE } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiShoppingBag, FiSearch, FiMoreHorizontal } from "react-icons/fi";

const STATUS_STYLE: Record<string, string> = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  canceled: "bg-red-50 text-red-500 border-red-200",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FiShoppingBag className="text-blue-600" /> Orders
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {orders.length} orders total
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name, email or ID..."
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
                  Order ID
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Customer
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                  Total
                </th>
                <th className="text-left py-3 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden lg:table-cell">
                  Date
                </th>
                <th className="py-3 px-5 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order?.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5">
                      <input type="checkbox" className="checkbox w-4 h-4" />
                    </td>
                    <td className="py-3 px-5">
                      <span className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        #{order?.id?.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {order?.name} {order?.lastname}
                        </p>
                        <p className="text-xs text-slate-400">{order?.country}</p>
                      </div>
                    </td>
                    <td className="py-3 px-5 hidden sm:table-cell">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_STYLE[order?.status] ?? "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                      >
                        {order?.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 font-bold text-slate-900 hidden md:table-cell">
                      ${order?.total}
                    </td>
                    <td className="py-3 px-5 text-slate-500 text-xs hidden lg:table-cell">
                      {order?.dateTime
                        ? new Date(Date.parse(order.dateTime)).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : "—"}
                    </td>
                    <td className="py-3 px-5">
                      <Link
                        href={`/admin/orders/${order?.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        aria-label="Order details"
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

export default AdminOrders;
