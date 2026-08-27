"use client";

import { DashboardSidebar } from "@/components";
import { API_BASE } from "@/lib/api";
import { useEffect, useState } from "react";
import {
    FiBarChart2,
    FiLoader,
    FiAlertTriangle,
    FiTrendingUp,
    FiShoppingBag,
    FiUsers,
    FiStar,
    FiDollarSign,
} from "react-icons/fi";

interface Stats {
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
}

export default function AdminAnalyticsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/stats`)
            .then((r) => {
                if (!r.ok) throw new Error(`Status ${r.status}`);
                return r.json();
            })
            .then(setStats)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const metrics = stats
        ? [
            {
                label: "Total Revenue",
                value: `$${stats.totalRevenue.toLocaleString()}`,
                sub: "From all completed orders",
                icon: FiDollarSign,
                color: "text-blue-600",
                bg: "bg-blue-50",
                bar: 100,
                barColor: "bg-blue-500",
            },
            {
                label: "Total Orders",
                value: stats.totalOrders.toLocaleString(),
                sub: `${stats.pendingOrders} pending`,
                icon: FiShoppingBag,
                color: "text-teal-600",
                bg: "bg-teal-50",
                bar: Math.min(100, (stats.totalOrders / 100) * 100),
                barColor: "bg-teal-500",
            },
            {
                label: "Registered Users",
                value: stats.totalUsers.toLocaleString(),
                sub: "All time sign-ups",
                icon: FiUsers,
                color: "text-purple-600",
                bg: "bg-purple-50",
                bar: Math.min(100, (stats.totalUsers / 500) * 100),
                barColor: "bg-purple-500",
            },
            {
                label: "Products Listed",
                value: stats.totalProducts.toLocaleString(),
                sub: "Active in catalogue",
                icon: FiStar,
                color: "text-amber-600",
                bg: "bg-amber-50",
                bar: Math.min(100, (stats.totalProducts / 100) * 100),
                barColor: "bg-amber-500",
            },
            {
                label: "Total Reviews",
                value: stats.totalReviews.toLocaleString(),
                sub: "All reviews submitted",
                icon: FiStar,
                color: "text-yellow-600",
                bg: "bg-yellow-50",
                bar: 100,
                barColor: "bg-yellow-500",
            },
            {
                label: "Genuine Reviews",
                value: `${stats.genuineReviews.toLocaleString()} (${stats.genuinePercent}%)`,
                sub: "Passed AI detection",
                icon: FiTrendingUp,
                color: "text-green-600",
                bg: "bg-green-50",
                bar: stats.genuinePercent,
                barColor: "bg-green-500",
            },
            {
                label: "Fake Reviews Caught",
                value: `${stats.fakeReviews.toLocaleString()} (${stats.fakePercent}%)`,
                sub: "Flagged by AI engine",
                icon: FiAlertTriangle,
                color: "text-red-500",
                bg: "bg-red-50",
                bar: stats.fakePercent,
                barColor: "bg-red-500",
            },
        ]
        : [];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <DashboardSidebar />
            <div className="flex-1 p-6 lg:p-8 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <FiBarChart2 className="text-blue-600" /> Analytics
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Live performance metrics pulled directly from the database.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                        <FiAlertTriangle className="flex-shrink-0" />
                        Could not load analytics: {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <FiLoader className="text-3xl text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {metrics.map((m) => (
                            <div key={m.label} className="card-premium p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                                            {m.label}
                                        </p>
                                        <p className="text-2xl font-extrabold text-slate-900">
                                            {m.value}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">{m.sub}</p>
                                    </div>
                                    <div
                                        className={`w-11 h-11 ${m.bg} rounded-xl flex items-center justify-center`}
                                    >
                                        <m.icon className={`${m.color} text-lg`} />
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${m.barColor} rounded-full transition-all duration-700`}
                                        style={{ width: `${Math.max(2, m.bar)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
