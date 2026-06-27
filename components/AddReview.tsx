"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiStar, FiSend, FiLoader } from "react-icons/fi";

export default function AddReview({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setSubmitting(true);
    try {
      // NOTE: Calls Next.js /api/product route which contains the isFakeReview detection logic.
      // The detection logic is NOT modified here — only the UI.
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment, userId }),
      });

      if (res.ok) {
        toast.success("Review submitted!");
        setRating(0);
        setComment("");
      } else {
        toast.error("Failed to submit review");
      }
    } catch {
      toast.error("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card-premium p-5">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <FiStar className="text-yellow-400" /> Write a Review
      </h3>

      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Your Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              className="text-2xl transition-transform hover:scale-110 active:scale-95"
            >
              <FiStar
                className={`${star <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-200"
                  } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2">Your Review</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your honest experience..."
          rows={4}
          className="input-premium resize-none text-sm"
        />
        <p className="text-[10px] text-slate-400 mt-1">
          Your review will be analyzed by our AI for authenticity.
        </p>
      </div>

      <button
        onClick={submitReview}
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 btn-primary-custom disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <FiLoader className="animate-spin-ring text-sm" />
            Analyzing...
          </>
        ) : (
          <>
            <FiSend className="text-sm" />
            Submit Review
          </>
        )}
      </button>
    </div>
  );
}
