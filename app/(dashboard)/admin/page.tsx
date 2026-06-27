"use client";
import { DashboardSidebar, StatsElement } from "@/components";
import React from "react";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiBox,
  FiStar,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiEye,
} from "react-icons/fi";

const STATS = [
  {
    title: "Total Revenue",
    value: "$48,295",
    change: "+18.2% this month",
    trend: "up" as const,
    icon: FiDollarSign,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+9.1% this month",
    trend: "up" as const,
    icon: FiShoppingBag,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    title: "Total Users",
    value: "3,847",
    change: "+24.5% this month",
    trend: "up" as const,
    icon: FiUsers,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Total Products",
    value: "482",
    change: "+6 new this week",
    trend: "up" as const,
    icon: FiBox,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Total Reviews",
    value: "9,214",
    change: "+312 this week",
    trend: "up" as const,
    icon: FiStar,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Fake Reviews",
    value: "847",
    change: "9.2% of total",
    trend: "down" as const,
    icon: FiAlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    title: "Genuine Reviews",
    value: "8,367",
    change: "90.8% authentic",
    trend: "up" as const,
    icon: FiCheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending Orders",
    value: "56",
    change: "Needs attention",
    trend: "neutral" as const,
    icon: FiClock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const RECENT_ORDERS = [
  { id: "#ORD-1291", customer: "Alice Johnson", product: "MacBook Pro", total: "$2,499", status: "processing" },
  { id: "#ORD-1290", customer: "Bob Smith", product: "iPhone 15 Pro", total: "$1,199", status: "delivered" },
  { id: "#ORD-1289", customer: "Carol White", product: "Sony Headphones", total: "$349", status: "canceled" },
  { id: "#ORD-1288", customer: "David Lee", product: "Samsung Galaxy S24", total: "$899", status: "delivered" },
  { id: "#ORD-1287", customer: "Eva Brown", product: "iPad Air", total: "$749", status: "processing" },
];

const STATUS_BADGE: Record<string, string> = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  canceled: "bg-red-50 text-red-500 border-red-200",
};

const AdminDashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back. Here's what's happening with TrustShop today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <StatsElement key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {/* Monthly Revenue */}
          <div className="lg:col-span-2 card-premium p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-800">Monthly Revenue</h3>
                <p className="text-xs text-slate-400">Last 6 months</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <FiTrendingUp /> +18.2%
              </div>
            </div>
            {/* Revenue bars — static visual */}
            <div className="flex items-end gap-3 h-36">
              {[
                { month: "Jan", height: 55, val: "$32k" },
                { month: "Feb", height: 65, val: "$38k" },
                { month: "Mar", height: 48, val: "$28k" },
                { month: "Apr", height: 72, val: "$42k" },
                { month: "May", height: 80, val: "$46k" },
                { month: "Jun", height: 90, val: "$48k" },
              ].map((b) => (
                <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-500">{b.val}</span>
                  <div
                    className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    style={{ height: `${b.height}%` }}
                  />
                  <span className="text-[10px] text-slate-400">{b.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fake vs Genuine */}
          <div className="card-premium p-5">
            <h3 className="font-bold text-slate-800 mb-1">Review Quality</h3>
            <p className="text-xs text-slate-400 mb-5">AI Detection Results</p>
            {/* Donut-style visual */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#16a34a" strokeWidth="3"
                    strokeDasharray="90.8 9.2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#ef4444" strokeWidth="3"
                    strokeDasharray="9.2 90.8"
                    strokeDashoffset="-90.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-slate-900">90.8%</span>
                  <span className="text-[10px] text-slate-400">genuine</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-slate-600">Genuine</span>
                </div>
                <span className="font-bold text-slate-900">8,367</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-slate-600">Fake / Spam</span>
                </div>
                <span className="font-bold text-slate-900">847</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Recent Orders</h3>
            <a href="/admin/orders" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <FiEye className="text-xs" /> View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="text-left pb-3 font-semibold">Order ID</th>
                  <th className="text-left pb-3 font-semibold">Customer</th>
                  <th className="text-left pb-3 font-semibold hidden md:table-cell">Product</th>
                  <th className="text-left pb-3 font-semibold">Total</th>
                  <th className="text-left pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 font-mono text-xs text-slate-600">{order.id}</td>
                    <td className="py-3 font-medium text-slate-800">{order.customer}</td>
                    <td className="py-3 text-slate-600 hidden md:table-cell">{order.product}</td>
                    <td className="py-3 font-bold text-slate-900">{order.total}</td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_BADGE[order.status]
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
