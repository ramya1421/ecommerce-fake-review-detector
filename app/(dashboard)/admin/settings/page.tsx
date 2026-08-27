"use client";

import { DashboardSidebar } from "@/components";
import { API_BASE } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiSettings,
    FiUser,
    FiShield,
    FiDatabase,
    FiCheckCircle,
    FiSave,
} from "react-icons/fi";

export default function AdminSettingsPage() {
    const { data: session } = useSession();
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        toast.success("Settings saved");
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const INFO_ROWS = [
        { label: "Frontend URL", value: typeof window !== "undefined" ? window.location.origin : "—" },
        { label: "Backend API", value: API_BASE },
        { label: "Auth Strategy", value: "JWT (NextAuth credentials)" },
        { label: "Database", value: "MySQL via Railway" },
        { label: "Fake Review Detection", value: "Rule-based heuristic (rating + keyword analysis)" },
        { label: "Next.js Version", value: "14.1.0" },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <DashboardSidebar />
            <div className="flex-1 p-6 lg:p-8 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <FiSettings className="text-blue-600" /> Settings
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Platform configuration and system information.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">

                    {/* Admin profile */}
                    <div className="card-premium p-6">
                        <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-base">
                            <FiUser className="text-blue-600" /> Admin Profile
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue={session?.user?.email ?? ""}
                                    readOnly
                                    className="input-premium bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Role
                                </label>
                                <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-semibold">
                                    <FiShield className="text-green-500" /> Administrator
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                className="btn-primary-custom w-full flex items-center justify-center gap-2 mt-2"
                            >
                                {saved ? (
                                    <><FiCheckCircle /> Saved</>
                                ) : (
                                    <><FiSave /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Detection settings */}
                    <div className="card-premium p-6">
                        <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-base">
                            <FiShield className="text-blue-600" /> Detection Settings
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Detection Mode
                                </label>
                                <select className="input-premium text-sm">
                                    <option>Rule-based (active)</option>
                                    <option disabled>ML-based (coming soon)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                                    Minimum Word Count Threshold
                                </label>
                                <input
                                    type="number"
                                    defaultValue={3}
                                    className="input-premium text-sm"
                                />
                                <p className="text-xs text-slate-400 mt-1">
                                    Reviews with fewer words than this are flagged as suspicious.
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-3 border-t border-slate-100">
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Flag extreme ratings</p>
                                    <p className="text-xs text-slate-400">Flag 1 and 5 star reviews with suspicious content</p>
                                </div>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer flex-shrink-0">
                                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                className="btn-primary-custom w-full flex items-center justify-center gap-2"
                            >
                                {saved ? (
                                    <><FiCheckCircle /> Saved</>
                                ) : (
                                    <><FiSave /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* System info */}
                    <div className="card-premium p-6 lg:col-span-2">
                        <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-base">
                            <FiDatabase className="text-blue-600" /> System Information
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {INFO_ROWS.map((row) => (
                                <div
                                    key={row.label}
                                    className="flex items-start justify-between gap-4 py-3 border-b border-slate-50 last:border-0"
                                >
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex-shrink-0">
                                        {row.label}
                                    </span>
                                    <span className="text-xs text-slate-700 font-mono text-right break-all">
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
