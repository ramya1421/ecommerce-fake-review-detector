const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/stats
 * Returns live counts and totals for the admin dashboard.
 */
router.get("/", async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalOrders,
            pendingOrders,
            totalReviews,
            fakeReviews,
            revenueResult,
            recentOrders,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.customer_order.count(),
            prisma.customer_order.count({ where: { status: "processing" } }),
            prisma.review.count(),
            prisma.review.count({ where: { isFake: true } }),
            // Sum of all order totals
            prisma.customer_order.aggregate({ _sum: { total: true } }),
            // Last 5 orders for the Recent Orders table
            prisma.customer_order.findMany({
                orderBy: { dateTime: "desc" },
                take: 5,
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    total: true,
                    status: true,
                    products: {
                        take: 1,
                        select: {
                            product: { select: { title: true } },
                        },
                    },
                },
            }),
        ]);

        const genuineReviews = totalReviews - fakeReviews;
        const totalRevenue = revenueResult._sum.total ?? 0;
        const fakePercent =
            totalReviews > 0
                ? ((fakeReviews / totalReviews) * 100).toFixed(1)
                : "0.0";
        const genuinePercent =
            totalReviews > 0
                ? ((genuineReviews / totalReviews) * 100).toFixed(1)
                : "0.0";

        res.json({
            totalRevenue,
            totalOrders,
            totalUsers,
            totalProducts,
            totalReviews,
            fakeReviews,
            genuineReviews,
            pendingOrders,
            fakePercent: parseFloat(fakePercent),
            genuinePercent: parseFloat(genuinePercent),
            recentOrders: recentOrders.map((o) => ({
                id: o.id,
                customer: `${o.name} ${o.lastname}`,
                product: o.products[0]?.product?.title ?? "—",
                total: `$${o.total}`,
                status: o.status,
            })),
        });
    } catch (error) {
        console.error("Stats error:", error);
        res.status(500).json({ error: "Failed to load stats" });
    }
});

module.exports = router;
