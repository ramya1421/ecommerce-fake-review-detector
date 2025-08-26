"use client";

import { useState } from "react";

export default function AddReview({ productId, userId }: { productId: string; userId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (!rating) return alert("Please select a rating");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, comment, userId }),
    });

    if (res.ok) {
      alert("Review added!");
      setRating(0);
      setComment("");
    } else {
      alert("Failed to add review");
    }

    {review.isFake && (
  <span className="text-red-500 text-sm ml-2">(Potentially fake)</span>
)}

  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold">Add a Review</h3>
      <div className="flex gap-2 my-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={submitReview}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
}
