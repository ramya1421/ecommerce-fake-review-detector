/**
 * TrustShop — Database Seed Script
 * Calls the live backend API to create categories and products.
 * 
 * Usage:
 *   node scripts/seed.js https://trusthub-backend.onrender.com
 */

const API = process.argv[2] || "http://localhost:3001";

console.log(`\n🌱 Seeding TrustShop via ${API}\n`);

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function post(path, body) {
    const res = await fetch(`${API}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`POST ${path} failed ${res.status}: ${text}`);
    }
    return res.json();
}

async function get(path) {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed ${res.status}`);
    return res.json();
}

// ─── Categories ──────────────────────────────────────────────────────────────

const CATEGORIES = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
];

// ─── Products ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
    // Electronics
    {
        title: "Sony WH-1000XM5 Wireless Headphones",
        slug: "sony-wh-1000xm5-headphones",
        price: 349,
        rating: 5,
        description: "Industry-leading noise canceling headphones with 30-hour battery life, crystal clear hands-free calling, and Alexa voice control. Lightweight design with premium cushioning for all-day comfort.",
        manufacturer: "Sony",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Electronics",
    },
    {
        title: "Apple MacBook Air M2 13-inch",
        slug: "apple-macbook-air-m2",
        price: 1099,
        rating: 5,
        description: "Supercharged by the next-generation M2 chip, MacBook Air is impossibly thin and can handle tasks from spreadsheets to photo editing with ease. Up to 18 hours of battery life.",
        manufacturer: "Apple",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Electronics",
    },
    {
        title: "Samsung Galaxy S24 Ultra",
        slug: "samsung-galaxy-s24-ultra",
        price: 1299,
        rating: 4,
        description: "The ultimate smartphone experience with a built-in S Pen, 200MP camera, titanium frame, and a 6.8-inch Dynamic AMOLED display. AI-powered features for next-level productivity.",
        manufacturer: "Samsung",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Electronics",
    },
    {
        title: "iPad Air 5th Generation",
        slug: "ipad-air-5th-gen",
        price: 749,
        rating: 4,
        description: "Serious performance in a thin and light design. M1 chip with 5G capability. Perfect for creative work, learning, and entertainment. Available in multiple colors.",
        manufacturer: "Apple",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Electronics",
    },
    {
        title: "LG 27-inch 4K UHD Monitor",
        slug: "lg-27-4k-monitor",
        price: 399,
        rating: 4,
        description: "27-inch 4K UHD IPS display with VESA DisplayHDR 400 and AMD FreeSync. USB-C connectivity and height-adjustable stand. Perfect for professionals and gamers alike.",
        manufacturer: "LG",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Electronics",
    },

    // Clothing
    {
        title: "Nike Air Max 270 Running Shoes",
        slug: "nike-air-max-270",
        price: 129,
        rating: 4,
        description: "Inspired by the Air Max 180 and Air Max 93, the Air Max 270 features Nike's biggest heel Air unit yet for a super-soft ride with every step. Available in multiple colorways.",
        manufacturer: "Nike",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Clothing",
    },
    {
        title: "Levi's 501 Original Fit Jeans",
        slug: "levis-501-original-jeans",
        price: 69,
        rating: 4,
        description: "The original jean since 1873. Straight fit with a button fly. Made from sturdy denim that gets better with wear. A timeless wardrobe staple available in classic washes.",
        manufacturer: "Levi's",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Clothing",
    },
    {
        title: "The North Face Thermoball Jacket",
        slug: "north-face-thermoball-jacket",
        price: 199,
        rating: 5,
        description: "Stay warm even when wet with ThermoBall insulation. Packable into its own pocket for easy storage. Ideal for cold-weather adventures and everyday wear.",
        manufacturer: "The North Face",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Clothing",
    },

    // Books
    {
        title: "Atomic Habits by James Clear",
        slug: "atomic-habits-james-clear",
        price: 18,
        rating: 5,
        description: "The #1 New York Times bestseller. A proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies.",
        manufacturer: "Penguin Books",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Books",
    },
    {
        title: "The Psychology of Money",
        slug: "psychology-of-money-morgan-housel",
        price: 15,
        rating: 5,
        description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.",
        manufacturer: "Harriman House",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Books",
    },
    {
        title: "Clean Code by Robert C. Martin",
        slug: "clean-code-robert-martin",
        price: 35,
        rating: 4,
        description: "A Handbook of Agile Software Craftsmanship. Even bad code can function, but if code isn't clean, it can bring a development organization to its knees. Essential reading for every developer.",
        manufacturer: "Prentice Hall",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Books",
    },

    // Home & Kitchen
    {
        title: "Ninja AF101 Air Fryer 4 Quart",
        slug: "ninja-af101-air-fryer",
        price: 99,
        rating: 4,
        description: "Air fry, roast, reheat, and dehydrate with up to 75% less fat than traditional frying. 4-quart ceramic coated basket, dishwasher safe. Wide temperature range 105°F to 400°F.",
        manufacturer: "Ninja",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Home & Kitchen",
    },
    {
        title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
        slug: "instant-pot-duo-7in1",
        price: 79,
        rating: 5,
        description: "7-in-1 multi-use programmable pressure cooker, slow cooker, rice cooker, steamer, saute pan, yogurt maker and food warmer. Cook up to 70% faster than conventional methods.",
        manufacturer: "Instant Pot",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Home & Kitchen",
    },
    {
        title: "Dyson V15 Detect Cordless Vacuum",
        slug: "dyson-v15-detect-vacuum",
        price: 699,
        rating: 5,
        description: "Powered by our most powerful Dyson digital motor, with laser dust detection, piezo sensor and anti-tangle technology. Up to 60 minutes of run time. Whole-machine filtration captures 99.99% of particles.",
        manufacturer: "Dyson",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Home & Kitchen",
    },

    // Sports
    {
        title: "Peloton Bike+ Indoor Exercise Bike",
        slug: "peloton-bike-plus",
        price: 2495,
        rating: 4,
        description: "Experience the world's best indoor cycling workouts from the comfort of home. Auto-Follow resistance, rotating 23.8-inch HD touchscreen, and access to thousands of live and on-demand classes.",
        manufacturer: "Peloton",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Sports",
    },
    {
        title: "Fitbit Charge 6 Fitness Tracker",
        slug: "fitbit-charge-6-tracker",
        price: 159,
        rating: 4,
        description: "Built-in GPS, heart rate monitoring, sleep tracking, and 40+ exercise modes. Up to 7 days battery life. Google apps compatibility including Google Maps and Google Wallet.",
        manufacturer: "Fitbit",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Sports",
    },
    {
        title: "Hydro Flask 32 oz Water Bottle",
        slug: "hydro-flask-32oz",
        price: 44,
        rating: 5,
        description: "TempShield double-wall vacuum insulation keeps beverages cold up to 24 hours and hot up to 12 hours. BPA-free stainless steel, dishwasher safe lid. Wide mouth opening for ice cubes.",
        manufacturer: "Hydro Flask",
        mainImage: "product_placeholder.jpg",
        inStock: 1,
        category: "Sports",
    },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
    // 1. Create categories
    console.log("📂 Creating categories...");
    const categoryMap = {};

    for (const name of CATEGORIES) {
        try {
            const cat = await post("/api/categories", { name });
            categoryMap[name] = cat.id;
            console.log(`  ✅ ${name} (${cat.id})`);
        } catch (err) {
            // Category may already exist — try to fetch it
            try {
                const cats = await get("/api/categories");
                const existing = cats.find((c) => c.name === name);
                if (existing) {
                    categoryMap[name] = existing.id;
                    console.log(`  ⏭  ${name} already exists (${existing.id})`);
                } else {
                    console.error(`  ❌ ${name}: ${err.message}`);
                }
            } catch (fetchErr) {
                console.error(`  ❌ Could not fetch categories: ${fetchErr.message}`);
            }
        }
    }

    // 2. Create products
    console.log("\n📦 Creating products...");
    let created = 0;
    let skipped = 0;

    for (const product of PRODUCTS) {
        const categoryId = categoryMap[product.category];
        if (!categoryId) {
            console.error(`  ❌ No category ID found for "${product.category}" — skipping ${product.slug}`);
            skipped++;
            continue;
        }

        try {
            await post("/api/products", {
                slug: product.slug,
                title: product.title,
                mainImage: product.mainImage,
                price: product.price,
                rating: product.rating,
                description: product.description,
                manufacturer: product.manufacturer,
                categoryId,
                inStock: product.inStock,
            });
            console.log(`  ✅ ${product.title}`);
            created++;
        } catch (err) {
            console.error(`  ❌ ${product.title}: ${err.message}`);
            skipped++;
        }
    }

    console.log(`\n✨ Done! Created ${created} products, skipped ${skipped}.`);
    console.log(`\n🌐 Visit ${API.replace("trusthub-backend", "trusthub-frontend")}/shop to see them.\n`);
}

seed().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
