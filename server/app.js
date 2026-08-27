const express = require("express");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const productsRouter = require("./routes/products");
const productImagesRouter = require("./routes/productImages");
const categoryRouter = require("./routes/category");
const searchRouter = require("./routes/search");
const mainImageRouter = require("./routes/mainImages");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/customer_orders");
const slugRouter = require("./routes/slugs");
const orderProductRouter = require("./routes/customer_order_product");
const wishlistRouter = require("./routes/wishlist");
const reviewRoutes = require("./routes/reviewRoutes");
const statsRouter = require("./routes/stats");
var cors = require("cors");

const app = express();

app.use(express.json());

// In production, restrict CORS to the deployed Vercel frontend URL.
// Set FRONTEND_URL env var on Render to your Vercel domain.
// Falls back to * in development so local Next.js still works.
const allowedOrigin = process.env.FRONTEND_URL || "*";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(fileUpload());

// Health check for Render
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", productImagesRouter);
app.use("/api/main-image", mainImageRouter);
app.use("/api/users", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/orders", orderRouter);
app.use("/api/order-product", orderProductRouter);
app.use("/api/slugs", slugRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/stats", statsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
