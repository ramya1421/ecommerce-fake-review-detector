"use client";
import { API_BASE } from "@/lib/api";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FiBell, FiChevronDown, FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop" },
];

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setTimeout(() => signOut(), 800);
    toast.success("Logout successful!");
  };

  // Scroll detection for sticky shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wishlist hydration
  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`${API_BASE}/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    const productArray = data.map((item: any) => ({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
    }));
    setWishlist(productArray);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`${API_BASE}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => getWishlistByUserId(data?.id));
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  const isAdmin = pathname.startsWith("/admin");

  /* ─── Admin header ─── */
  if (isAdmin) {
    return (
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <HeaderTop />
        <div className="section-container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiGrid className="text-white text-sm" />
            </div>
            <span className="font-bold text-slate-800 text-lg">TrustShop</span>
            <span className="ml-1 text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
              <FiBell className="text-lg" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <FiChevronDown className="text-slate-400 text-sm" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-card-hover bg-white rounded-xl w-48 border border-slate-100 mt-2">
                <li>
                  <Link href="/admin" className="text-sm text-slate-700">Dashboard</Link>
                </li>
                <li>
                  <a className="text-sm text-slate-700">Profile</a>
                </li>
                <li>
                  <a href="#" onClick={handleLogout} className="text-sm text-red-500">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }

  /* ─── Main header ─── */
  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_16px_0_rgba(0,0,0,0.08)]" : "border-b border-slate-100"}`}>
      <HeaderTop />

      {/* Main nav bar */}
      <div className="section-container h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FiGrid className="text-white text-sm" />
          </div>
          <span className="font-extrabold text-slate-800 text-xl tracking-tight">
            Trust<span className="text-blue-600">Shop</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${pathname === link.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-sm hidden lg:block">
          <SearchInput />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <HeartElement wishQuantity={wishQuantity} />
          <CartElement />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 relative transition-all ${mobileOpen ? "h-0" : "h-px"} bg-slate-700 before:absolute before:w-5 before:h-px before:bg-slate-700 before:transition-all ${mobileOpen ? "before:top-0 before:rotate-45" : "before:-top-1.5"} after:absolute after:w-5 after:h-px after:bg-slate-700 after:transition-all ${mobileOpen ? "after:top-0 after:-rotate-45" : "after:top-1.5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in px-4 pb-4 pt-2 space-y-2">
          <SearchInput />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-slate-700 px-3 py-2.5 rounded-lg hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          {!session ? (
            <div className="flex gap-2 pt-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-secondary-custom text-center text-sm">Sign In</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary-custom text-center text-sm">Register</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full text-left text-sm text-red-500 font-medium px-3 py-2.5 rounded-lg hover:bg-red-50 flex items-center gap-2">
              <FiLogOut /> Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
