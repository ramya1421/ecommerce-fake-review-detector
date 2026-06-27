"use client";
import { ProductInCart, useProductStore } from "@/app/_zustand/store";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const QuantityInputCart = ({ product }: { product: ProductInCart }) => {
  const [quantityCount, setQuantityCount] = useState<number>(product.amount);
  const { updateCartAmount, calculateTotals } = useProductStore();

  const handleChange = (action: "plus" | "minus") => {
    if (action === "plus") {
      const next = quantityCount + 1;
      setQuantityCount(next);
      updateCartAmount(product.id, next);
      calculateTotals();
    } else if (action === "minus" && quantityCount > 1) {
      const next = quantityCount - 1;
      setQuantityCount(next);
      updateCartAmount(product.id, next);
      calculateTotals();
    }
  };

  return (
    <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => handleChange("minus")}
        disabled={quantityCount <= 1}
        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease"
      >
        <FiMinus className="text-xs" />
      </button>
      <span className="w-8 text-center text-sm font-bold text-slate-900 border-x border-slate-200 h-8 flex items-center justify-center select-none">
        {quantityCount}
      </span>
      <button
        type="button"
        onClick={() => handleChange("plus")}
        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
        aria-label="Increase"
      >
        <FiPlus className="text-xs" />
      </button>
    </div>
  );
};

export default QuantityInputCart;
