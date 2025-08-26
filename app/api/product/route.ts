import { NextResponse } from "next/server";
import prisma from "@/utils/db"; // keep same db instance

function isFakeReview(rating: number, comment: string): boolean {
  const suspiciousPhrases = ["great product", "nice", "good", "best", "worst", "scam"];
  const tooShort = comment.trim().split(" ").length < 3;
  const containsSuspicious = suspiciousPhrases.some((p) =>
    comment.toLowerCase().includes(p)
  );

  return (rating === 1 || rating === 5) && (tooShort || containsSuspicious);
}

export async function POST(req: Request) {
  try {
    const { productId, rating, comment, userId } = await req.json();

    if (!productId || !rating || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const fakeFlag = isFakeReview(rating, comment || "");

    const newReview = await prisma.review.create({
      data: {
        productId,
        rating,
        comment,
        userId,
        isFake: fakeFlag,
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Error adding review", error },
      { status: 500 }
    );
  }
}
