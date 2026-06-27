"use client";
import Link from "next/link";
import React from "react";
import { FiHeart } from "react-icons/fi";

const HeartElement = ({ wishQuantity }: { wishQuantity: number }) => {
  return (
    <Link
      href="/wishlist"
      className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 hover:text-red-500 transition-all"
      aria-label="Wishlist"
    >
      <FiHeart className="text-lg" />
      {wishQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
          {wishQuantity > 99 ? "99+" : wishQuantity}
        </span>
      )}
    </Link>
  );
};

export default HeartElement;
