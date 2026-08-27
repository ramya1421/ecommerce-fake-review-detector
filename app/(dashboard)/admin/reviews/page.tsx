"use client";

import { DashboardSidebar } from "@/components";
import { API_BASE } from "@/lib/api";
import { useEffect, useState } from "react";
import {
    FiShield,
    FiAlertTriangle,
    FiCheckCircle,
    FiLoader,
    FiSearch,
    FiUser,
    FiStar,
    FiXCircle,
} from "react-icons/fi";

interface Review {
    id: string;
    rating: number;
    comment: string;
    isFake: boolean;
    createdAt: string;
    user?: { email?: string; name?: string };
    product?: { title?: string };
}

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "fake" | "genuine">("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Fetch all products then all their reviews
                const productsRes = await fetch(`${API_BASE}/api/products?mode=admin`);
                if (!productsRes.ok) throw new Error("Failed to fetch products");
                const products = await productsRes.json();

                const allReviews: Review[] = [];
                await Promise.all(
                    products.slice(0, 50).map(async (p: any) => {
                        try {
                            const r = await fetch(`${API_BASE}/api/reviews/${p.id}`);
                            if (r.ok) {
                                const data: Review[] = await r.json();
                                data.forEach((rev) => {
                                    allReviews.push({ ...rev, product: { title: p.title } });
                                });
                            }
                        } catch { }
                    })
                );

                // Sort newest first
                allReviews.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setReviews(allReviews);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const filtered = reviews.filter((r) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "fake" && r.isFake) ||
            (filter === "genuine" && !r.isFake);
        const matchesSearch =
            !search ||
            r.comment?.toLowerCase().includes(search.toLowerCase()) ||
            r.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
            r.product?.title?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const fakeCount = reviews.filter((r) => r.isFake).length;
    const genuineCount = reviews.length - fakeCount;
    const fakePercent =
        reviews.length > 0 ? ((fakeCount / reviews.length) * 100).toFixed(1) : "0";

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <DashboardSidebar />
            <div className="flex-1 p-6 lg:p-8 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <FiShield className="text-blue-600" /> AI Detection — All Reviews
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Monitor and audit every review analyzed by the fake detection engine.
                    </p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="card-premium p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <FiShield className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-slate-900">
                                {reviews.length}
                            </p>
                            <p className="text-xs text-slate-500">Total Reviews</p>
                        </div>
                    </div>
                    <div className="card-premium p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                            <FiCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-slate-900">
                                {genuineCount}
                            </p>
                            <p className="text-xs text-slate-500">Genuine Reviews</p>
                        </div>
                    </div>
                    <div className="card-premium p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                            <FiAlertTriangle className="text-red-500 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-slate-900">
                                {fakeCount}
                                <span className="text-sm font-medium text-red-400 ml-1">
                                    ({fakePercent}%)
                                </span>
                            </p>
                            <p className="text-xs text-slate-500">Flagged as Fake</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="card-premium p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-2">
                        {(["all", "genuine", "fake"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all capitalize ${filter === f
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {f === "all"
                                    ? `All (${reviews.length})`
                                    : f === "genuine"
                                        ? `Genuine (${genuineCount})`
                                        : `Fake (${fakeCount})`}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-premium pl-9 text-sm py-2 w-64"
                        />
                    </div>
                </div>

                {/* Reviews table */}
                <div className="card-premium overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <FiLoader className="animate-spin text-blue-500 text-3xl" />
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : filtered.length === 0 ? (
                        <div className="p-12 text-center text-slate-400">
                            No reviews found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr className="text-xs text-slate-500 font-semibold">
                                        <th className="text-left px-5 py-3">Status</th>
                                        <th className="text-left px-5 py-3">Review</th>
                                        <th className="text-left px-5 py-3 hidden md:table-cell">Product</th>
                                        <th className="text-left px-5 py-3 hidden lg:table-cell">User</th>
                                        <th className="text-left px-5 py-3">Rating</th>
                                        <th className="text-left px-5 py-3 hidden md:table-cell">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filtered.map((review) => (
                                        <tr
                                            key={review.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-5 py-4">
                                                {review.isFake ? (
                                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 w-fit">
                                                        <FiXCircle className="text-xs" /> Fake
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 w-fit">
                                                        <FiCheckCircle className="text-xs" /> Genuine
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 max-w-xs">
                                                <p className="text-slate-700 text-sm line-clamp-2">
                                                    {review.comment || (
                                                        <span className="text-slate-400 italic">No comment</span>
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 hidden md:table-cell text-slate-500 text-xs max-w-[150px] truncate">
                                                {review.product?.title ?? "—"}
                                            </td>
                                            <td className="px-5 py-4 hidden lg:table-cell">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <FiUser className="flex-shrink-0" />
                                                    <span className="truncate max-w-[120px]">
                                                        {review.user?.email ?? "Guest"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <FiStar
                                                            key={s}
                                                            className={`text-xs ${s <= review.rating
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-slate-200"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 hidden md:table-cell text-xs text-slate-400">
                                                {new Date(review.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
