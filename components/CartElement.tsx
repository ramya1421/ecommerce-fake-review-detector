"use client";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
  const { allQuantity } = useProductStore();
  return (
    <Link
      href="/cart"
      className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all"
      aria-label="Shopping cart"
    >
      <FiShoppingCart className="text-lg" />
      {allQuantity > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
          {allQuantity > 99 ? "99+" : allQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartElement;
