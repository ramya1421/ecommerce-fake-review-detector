const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new review
router.post("/", async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const review = await prisma.review.create({
      data: { productId, userId, rating, comment },
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
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
