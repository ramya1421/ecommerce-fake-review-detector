"use client";
import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiZap } from "react-icons/fi";

const BuyNowSingleProductBtn = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const router = useRouter();
  const { addToCart, calculateTotals } = useProductStore();

  const handleBuyNow = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Proceeding to checkout!");
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl active:scale-[.98] transition-all duration-200 w-full sm:w-auto"
    >
      <FiZap className="text-base text-yellow-400" />
      Buy Now
    </button>
  );
};

export default BuyNowSingleProductBtn;
