"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewSection({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/reviews/${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [productId]);

  const submitReview = async () => {
    const userId = 1; // replace with logged in user’s id
    const res = await fetch("http://localhost:3001/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId, rating, comment }),
    });
    if (res.ok) {
      toast.success("Review added!");
      setComment("");
      setRating(0);
      const data = await fetch(
        `http://localhost:3001/api/reviews/${productId}`
      ).then((res) => res.json());
      setReviews(data);
    } else {
      toast.error("Error adding review");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-5)"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={submitReview}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Submit
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="border p-3 rounded">
            <p className="font-semibold">
              {rev.user?.name || "Anonymous"} ⭐ {rev.rating}
            </p>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
