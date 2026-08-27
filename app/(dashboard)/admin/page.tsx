"use client";
import { DashboardSidebar, StatsElement } from "@/components";
import { API_BASE } from "@/lib/api";
import React, { useEffect, useState } from "react";
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
  FiLoader,
} from "react-icons/fi";

/* ─── Types ─── */
interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalReviews: number;
  fakeReviews: number;
  genuineReviews: number;
  pendingOrders: number;
  fakePercent: number;
  genuinePercent: number;
  recentOrders: {
    id: string;
    customer: string;
    product: string;
    total: string;
    status: string;
  }[];
}

const STATUS_BADGE: Record<string, string> = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  canceled: "bg-red-50 text-red-500 border-red-200",
};

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/stats`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data: DashboardStats = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Build STATS array from live data (or show skeleton placeholders while loading)
  const STATS = stats
    ? [
      {
        title: "Total Revenue",
        value: `$${stats.totalRevenue.toLocaleString()}`,
        change: "Live from orders",
        trend: "up" as const,
        icon: FiDollarSign,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: "Total Orders",
        value: stats.totalOrders.toLocaleString(),
        change: `${stats.pendingOrders} pending`,
        trend: "up" as const,
        icon: FiShoppingBag,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
      },
      {
        title: "Total Users",
        value: stats.totalUsers.toLocaleString(),
        change: "Registered accounts",
        trend: "up" as const,
        icon: FiUsers,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        title: "Total Products",
        value: stats.totalProducts.toLocaleString(),
        change: "In catalogue",
        trend: "up" as const,
        icon: FiBox,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        title: "Total Reviews",
        value: stats.totalReviews.toLocaleString(),
        change: "All time",
        trend: "up" as const,
        icon: FiStar,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
      {
        title: "Fake Reviews",
        value: stats.fakeReviews.toLocaleString(),
        change: `${stats.fakePercent}% of total`,
        trend: "down" as const,
        icon: FiAlertTriangle,
        iconBg: "bg-red-100",
        iconColor: "text-red-500",
      },
      {
        title: "Genuine Reviews",
        value: stats.genuineReviews.toLocaleString(),
        change: `${stats.genuinePercent}% authentic`,
        trend: "up" as const,
        icon: FiCheckCircle,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        title: "Pending Orders",
        value: stats.pendingOrders.toLocaleString(),
        change: "Needs attention",
        trend: "neutral" as const,
        icon: FiClock,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
    ]
    : [];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back. Here&apos;s what&apos;s happening with TrustShop today.
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            <FiAlertTriangle className="flex-shrink-0" />
            <span>Could not load live stats: {error}. Check that the backend is running.</span>
          </div>
        )}

        {/* Stats grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <FiLoader className="text-3xl text-blue-500 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {STATS.map((stat) => (
                <StatsElement key={stat.title} {...stat} />
              ))}
            </div>

            {/* Charts row */}
            <div className="grid lg:grid-cols-3 gap-5 mb-8">
              {/* Revenue placeholder — replace with real chart when time-series data is available */}
              <div className="lg:col-span-2 card-premium p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-slate-800">Total Revenue</h3>
                    <p className="text-xs text-slate-400">Cumulative across all orders</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    <FiTrendingUp /> Live
                  </div>
                </div>
                <div className="flex items-center justify-center h-36 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-slate-900">
                      ${stats?.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      from {stats?.totalOrders.toLocaleString()} orders
                    </p>
                  </div>
                </div>
              </div>

              {/* Fake vs Genuine — live data */}
              <div className="card-premium p-5">
                <h3 className="font-bold text-slate-800 mb-1">Review Quality</h3>
                <p className="text-xs text-slate-400 mb-5">AI Detection Results</p>
                <div className="flex items-center justify-center mb-5">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke="#16a34a" strokeWidth="3"
                        strokeDasharray={`${stats?.genuinePercent ?? 0} ${100 - (stats?.genuinePercent ?? 0)}`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke="#ef4444" strokeWidth="3"
                        strokeDasharray={`${stats?.fakePercent ?? 0} ${100 - (stats?.fakePercent ?? 0)}`}
                        strokeDashoffset={`-${stats?.genuinePercent ?? 0}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-slate-900">
                        {stats?.genuinePercent ?? 0}%
                      </span>
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
                    <span className="font-bold text-slate-900">
                      {stats?.genuineReviews.toLocaleString() ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-slate-600">Fake / Spam</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {stats?.fakeReviews.toLocaleString() ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent orders — live */}
            <div className="card-premium p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-800">Recent Orders</h3>
                <a
                  href="/admin/orders"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <FiEye className="text-xs" /> View all
                </a>
              </div>
              {stats?.recentOrders.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No orders yet.</p>
              ) : (
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
                      {stats?.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 font-mono text-xs text-slate-600">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="py-3 font-medium text-slate-800">{order.customer}</td>
                          <td className="py-3 text-slate-600 hidden md:table-cell">{order.product}</td>
                          <td className="py-3 font-bold text-slate-900">{order.total}</td>
                          <td className="py-3">
                            <span
                              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border capitalize ${STATUS_BADGE[order.status] ?? "bg-slate-50 text-slate-600 border-slate-200"
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
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
