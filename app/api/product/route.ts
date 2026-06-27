import { NextResponse } from "next/server";
import prisma from "@/utils/db";

// ─── Fake Review Detection Logic ─────────────────────────────────────────────
// DO NOT MODIFY — this is the core detection algorithm
function isFakeReview(rating: number, comment: string): boolean {
  const suspiciousPhrases = [
    "great product",
    "nice",
    "good",
    "best",
    "worst",
    "scam",
  ];
  const tooShort = comment.trim().split(/\s+/).length < 3;
  const containsSuspicious = suspiciousPhrases.some((p) =>
    comment.toLowerCase().includes(p)
  );
  return (rating === 1 || rating === 5) && (tooShort || containsSuspicious);
}
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, rating, comment, userId } = body;

    if (!productId || !rating) {
      return NextResponse.json(
        { message: "Missing required fields: productId and rating" },
        { status: 400 }
      );
    }

    const fakeFlag = isFakeReview(Number(rating), comment || "");

    // Resolve userId — use provided or fall back to a system guest user
    let resolvedUserId = userId;

    if (!resolvedUserId || resolvedUserId === "guest-user" || resolvedUserId === "dummy-user-id") {
      // Try to find or create a guest user so FK constraint is satisfied
      const guestEmail = "guest@trustshop.internal";
      let guestUser = await prisma.user.findFirst({
        where: { email: guestEmail },
      });
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            id: "guest-system-user",
            email: guestEmail,
            role: "user",
          },
        });
      }
      resolvedUserId = guestUser.id;
    }

    const newReview = await prisma.review.create({
      data: {
        productId,
        rating: Number(rating),
        comment: comment || "",
        userId: resolvedUserId,
        isFake: fakeFlag,
      },
    });

    return NextResponse.json(newReview);
  } catch (error: any) {
    console.error("Error adding review:", error?.message);
    return NextResponse.json(
      { message: "Error adding review", error: error?.message },
      { status: 500 }
    );
  }
}
