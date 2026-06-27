"use client";

import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface QuantityInputProps {
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({ quantityCount, setQuantityCount }: QuantityInputProps) => {
  const handleChange = (action: "plus" | "minus") => {
    if (action === "plus") {
      setQuantityCount((q) => q + 1);
    } else if (action === "minus" && quantityCount > 1) {
      setQuantityCount((q) => q - 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-600">Quantity</span>
      <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => handleChange("minus")}
          disabled={quantityCount <= 1}
          className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <FiMinus className="text-xs" />
        </button>
        <span className="w-10 text-center text-sm font-bold text-slate-900 border-x border-slate-200 h-9 flex items-center justify-center select-none">
          {quantityCount}
        </span>
        <button
          type="button"
          onClick={() => handleChange("plus")}
          className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          aria-label="Increase quantity"
        >
          <FiPlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
