"use client";

import React, { useState } from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiTag,
  FiUsers,
  FiShield,
  FiBarChart2,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", icon: FiGrid, label: "Dashboard" },
  { href: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
  { href: "/admin/products", icon: FiBox, label: "Products" },
  { href: "/admin/categories", icon: FiTag, label: "Categories" },
  { href: "/admin/users", icon: FiUsers, label: "Users" },
  { href: "/admin/reviews", icon: FiShield, label: "AI Detection" },
  { href: "/admin/analytics", icon: FiBarChart2, label: "Analytics" },
  { href: "/admin/settings", icon: FiSettings, label: "Settings" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-slate-900 min-h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        } flex-shrink-0 relative`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2 px-4 py-5 border-b border-slate-800 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <FiGrid className="text-white text-sm" />
        </div>
        {!collapsed && (
          <span className="font-extrabold text-white text-base tracking-tight">
            Trust<span className="text-blue-400">Shop</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <item.icon className={`text-base flex-shrink-0 ${active ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <FiChevronRight className="text-xs" />
        ) : (
          <FiChevronLeft className="text-xs" />
        )}
      </button>
    </aside>
  );
};

export default DashboardSidebar;
