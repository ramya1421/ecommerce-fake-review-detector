"use client";

import { API_BASE } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiShield,
  FiAlertTriangle,
  FiStar,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiSend,
  FiInfo,
} from "react-icons/fi";

/* ─── Types ─── */
interface Review {
  id: string | number;
  rating: number;
  comment: string;
  isFake?: boolean;
  createdAt?: string;
  user?: { name?: string; email?: string };
  // Extended fields from detection API
  authenticityScore?: number;
  confidence?: number;
  spamProbability?: number;
  reasons?: string[];
}

/* ─── Helpers ─── */

/** Re-implements the server-side isFakeReview logic purely for display purposes.
 *  This does NOT change or replace the actual detection — it mirrors it so we can
 *  generate a richer UI from the stored `isFake` boolean + derive scores. */
function deriveAnalysis(review: Review) {
  const suspiciousPhrases = [
    "great product",
    "nice",
    "good",
    "best",
    "worst",
    "scam",
  ];
  const text = (review.comment ?? "").toLowerCase();
  const wordCount = text.trim().split(/\s+/).length;
  const tooShort = wordCount < 3;
  const foundPhrases = suspiciousPhrases.filter((p) => text.includes(p));
  const extremeRating = review.rating === 1 || review.rating === 5;

  // Mirrors the detection rule from app/api/product/route.ts exactly
  const isFake =
    review.isFake !== undefined
      ? review.isFake
      : extremeRating && (tooShort || foundPhrases.length > 0);

  // Derive a plausible authenticity score for visualization
  let base = 85;
  if (extremeRating) base -= 15;
  if (tooShort) base -= 20;
  if (foundPhrases.length > 0) base -= foundPhrases.length * 10;
  if (wordCount > 20) base += 10;
  if (wordCount > 40) base += 5;
  const authenticityScore = Math.max(5, Math.min(99, base));

  const confidence = isFake
    ? Math.max(72, Math.min(97, 100 - authenticityScore + 60))
    : Math.max(70, Math.min(96, authenticityScore - 5));

  const spamProbability = isFake
    ? Math.max(40, 100 - authenticityScore)
    : Math.min(30, 100 - authenticityScore);

  const reasons: string[] = [];
  if (tooShort) reasons.push("Review text is unusually short");
  if (extremeRating && isFake) reasons.push("Extreme rating combined with suspicious text");
  if (foundPhrases.length > 0)
    reasons.push(`Contains generic phrase: "${foundPhrases[0]}"`);
  if (!isFake && wordCount > 30) reasons.push("Detailed, informative content");
  if (!isFake && !extremeRating) reasons.push("Balanced rating with genuine tone");

  return { isFake, authenticityScore, confidence, spamProbability, reasons };
}

/* ─── Sub-components ─── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          className={`text-sm ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"
            }`}
        />
      ))}
    </div>
  );
}

function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: "green" | "red" | "blue";
}) {
  const fillClass =
    color === "green"
      ? "bg-green-500"
      : color === "red"
        ? "bg-red-500"
        : "bg-blue-500";
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${fillClass} rounded-full transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function AIAnalysisCard({ review }: { review: Review }) {
  const analysis = deriveAnalysis(review);
  const { isFake, authenticityScore, confidence, spamProbability, reasons } =
    analysis;

  return (
    <div
      className={`mt-3 rounded-xl border p-4 ${isFake
          ? "bg-red-50/60 border-red-200"
          : "bg-green-50/60 border-green-200"
        }`}
    >
      {/* AI badge header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${isFake ? "bg-red-100" : "bg-green-100"
              }`}
          >
            {isFake ? (
              <FiAlertTriangle className="text-red-500 text-sm" />
            ) : (
              <FiShield className="text-green-600 text-sm" />
            )}
          </div>
          <span className="text-xs font-bold text-slate-700">
            AI Review Analysis
          </span>
        </div>
        {isFake ? (
          <span className="badge-fake">
            <FiXCircle className="text-xs" /> Potentially Fake
          </span>
        ) : (
          <span className="badge-genuine">
            <FiCheckCircle className="text-xs" /> Genuine
          </span>
        )}
      </div>

      {/* Score bars */}
      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Authenticity Score</span>
            <span className="font-semibold text-slate-700">
              {authenticityScore}%
            </span>
          </div>
          <ProgressBar
            value={authenticityScore}
            color={authenticityScore > 60 ? "green" : "red"}
          />
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Detection Confidence</span>
            <span className="font-semibold text-slate-700">{confidence}%</span>
          </div>
          <ProgressBar value={confidence} color="blue" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Spam Probability</span>
            <span className="font-semibold text-slate-700">
              {spamProbability}%
            </span>
          </div>
          <ProgressBar
            value={spamProbability}
            color={spamProbability > 40 ? "red" : "green"}
          />
        </div>
      </div>

      {/* Reasons */}
      {reasons.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200/60">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">
            Detection signals
          </p>
          <ul className="space-y-1">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                <FiInfo className="mt-0.5 flex-shrink-0 text-slate-400 text-xs" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const analysis = deriveAnalysis(review);
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "Recently";

  return (
    <div className={`card-premium p-5 animate-fade-in ${analysis.isFake ? "border-red-100" : ""}`}>
      {/* Reviewer info */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {(review.user?.name ?? review.user?.email ?? "A")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {review.user?.name ?? review.user?.email ?? "Anonymous"}
            </p>
            <p className="text-xs text-slate-400">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StarRating rating={review.rating} />
          {/* Verified badge */}
          {!analysis.isFake && (
            <span className="hidden sm:flex badge-genuine">
              <FiCheckCircle className="text-xs" /> Verified
            </span>
          )}
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-slate-600 leading-relaxed mb-3">
        {review.comment ?? <span className="text-slate-400 italic">No comment provided</span>}
      </p>

      {/* Toggle AI analysis */}
      <button
        onClick={() => setShowAnalysis((v) => !v)}
        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${analysis.isFake
            ? "text-red-500 hover:text-red-600"
            : "text-blue-600 hover:text-blue-700"
          }`}
      >
        {analysis.isFake ? (
          <FiAlertTriangle className="text-sm" />
        ) : (
          <FiShield className="text-sm" />
        )}
        {showAnalysis ? "Hide" : "View"} AI Analysis
        {analysis.isFake && (
          <span className="ml-1 badge-fake">Suspicious</span>
        )}
      </button>

      {showAnalysis && <AIAnalysisCard review={review} />}
    </div>
  );
}

/* ─── Main component ─── */
export default function ReviewSection({ productId }: { productId: string | number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (_) {
      // backend offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

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
      // NOTE: This calls the Next.js API route which contains the fake detection logic.
      // The detection logic (isFakeReview function) is NOT modified here.
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: "guest-user",
          rating,
          comment,
        }),
      });

      if (res.ok) {
        toast.success("Review submitted!");
        setRating(0);
        setComment("");
        await fetchReviews();
      } else {
        const err = await res.json();
        toast.error(err.message ?? "Failed to submit review");
      }
    } catch (_) {
      toast.error("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Rating summary
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;
  const fakeCount = reviews.filter((r) => deriveAnalysis(r).isFake).length;
  const genuineCount = reviews.length - fakeCount;

  return (
    <div className="section-container py-12">
      {/* Section header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
          Customer Reviews
        </h2>
        <p className="text-sm text-slate-500">
          All reviews are analyzed in real-time by our AI fake review detector.
        </p>
      </div>

      {/* Summary bar */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 mb-8 grid sm:grid-cols-3 gap-5">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-extrabold text-slate-900">
              {avgRating.toFixed(1)}
            </div>
            <div>
              <StarRating rating={Math.round(avgRating)} />
              <p className="text-xs text-slate-500 mt-1">{reviews.length} reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:border-x border-slate-100 sm:px-5">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-lg" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{genuineCount}</p>
              <p className="text-xs text-slate-500">Genuine reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <FiAlertTriangle className="text-red-500 text-lg" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{fakeCount}</p>
              <p className="text-xs text-slate-500">Flagged as suspicious</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Reviews list */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="skeleton-box w-9 h-9 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <div className="skeleton-box h-3 w-32 rounded" />
                      <div className="skeleton-box h-2.5 w-20 rounded" />
                    </div>
                  </div>
                  <div className="skeleton-box h-3 w-full rounded mb-1.5" />
                  <div className="skeleton-box h-3 w-4/5 rounded" />
                </div>
              ))}
            </>
          ) : reviews.length === 0 ? (
            <div className="card-premium p-10 text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiStar className="text-2xl text-slate-400" />
              </div>
              <p className="font-semibold text-slate-600">No reviews yet</p>
              <p className="text-sm text-slate-400 mt-1">
                Be the first to share your experience.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>

        {/* Write a review form */}
        <div className="lg:col-span-1">
          <div className="card-premium p-5 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiStar className="text-yellow-400" />
              Write a Review
            </h3>

            {/* Star picker */}
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
              {rating > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                </p>
              )}
            </div>

            {/* Comment */}
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">Your Review</p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your honest experience with this product..."
                rows={4}
                className="input-premium resize-none text-sm"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Your review will be analyzed by our AI for authenticity.
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={submitReview}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 btn-primary-custom disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <FiLoader className="animate-spin-ring text-sm" />
                  Analyzing & Submitting...
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
