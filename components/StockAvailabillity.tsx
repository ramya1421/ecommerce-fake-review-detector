import React from "react";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

const StockAvailabillity = ({
  stock,
  inStock,
}: {
  stock: number;
  inStock: number;
}) => {
  const isInStock = inStock === 1;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full ${isInStock
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-600 border border-red-200"
          }`}
      >
        {isInStock ? (
          <FiCheck className="text-xs" />
        ) : (
          <FiX className="text-xs" />
        )}
        {isInStock ? "In Stock" : "Out of Stock"}
      </span>
      {isInStock && (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <FiAlertCircle className="text-xs text-amber-500" />
          Only {stock > 10 ? "few" : stock} left
        </span>
      )}
    </div>
  );
};

export default StockAvailabillity;
