import React from "react";
import { FiStar } from "react-icons/fi";

const SingleProductRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <FiStar
            key={s}
            className={`text-lg ${s <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-200 fill-slate-200"
              }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-700">{rating}.0</span>
      <span className="text-sm text-slate-400">(3 reviews)</span>
    </div>
  );
};

export default SingleProductRating;
