const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new review (no fake detection here — detection is in Next.js /api/product)
router.post("/", async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    if (!productId || !userId || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating: Number(rating),
        comment: comment || "",
      },
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews for a product (productId is a UUID string, NOT an integer)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId; // UUID string — do NOT parseInt
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
