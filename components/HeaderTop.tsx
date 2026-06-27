"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FiHeadphones, FiMail, FiUser, FiLogOut, FiLogIn } from "react-icons/fi";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 800);
    toast.success("Logged out successfully");
  };

  return (
    <div className="bg-blue-600 text-white text-xs">
      <div className="section-container h-9 flex items-center justify-between gap-4">
        {/* Left — contact info */}
        <ul className="hidden sm:flex items-center gap-5">
          <li className="flex items-center gap-1.5 opacity-90">
            <FiHeadphones className="text-sm" />
            <span>+381 61 123 321</span>
          </li>
          <li className="flex items-center gap-1.5 opacity-90">
            <FiMail className="text-sm" />
            <span>support@trustshop.com</span>
          </li>
        </ul>
        <p className="sm:hidden text-white/80 font-medium">TrustShop — AI Review Detection</p>

        {/* Right — auth */}
        <ul className="flex items-center gap-4">
          {!session ? (
            <>
              <li>
                <Link
                  href="/login"
                  className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity font-medium"
                >
                  <FiLogIn className="text-sm" />
                  <span>Sign In</span>
                </Link>
              </li>
              <li className="h-3 w-px bg-white/30" />
              <li>
                <Link
                  href="/register"
                  className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity font-medium"
                >
                  <FiUser className="text-sm" />
                  <span>Register</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="hidden sm:flex items-center gap-1 opacity-80">
                <FiUser className="text-sm" />
                <span className="max-w-[180px] truncate">{session.user?.email}</span>
              </li>
              <li className="h-3 w-px bg-white/30 hidden sm:block" />
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity font-medium"
                >
                  <FiLogOut className="text-sm" />
                  <span>Sign Out</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
