/**
 * TrustShop — Make Admin Script
 * Promotes a user to admin via the backend API.
 *
 * Usage:
 *   node scripts/make-admin.js your@email.com https://trusthub-backend.onrender.com
 */

const email = process.argv[2];
const API = process.argv[3] || "https://trusthub-backend.onrender.com";

if (!email) {
    console.error("Usage: node scripts/make-admin.js your@email.com");
    process.exit(1);
}

async function makeAdmin() {
    console.log(`\n🔑 Promoting ${email} to admin via ${API}...\n`);

    // 1. Find user by email
    const res = await fetch(`${API}/api/users/email/${encodeURIComponent(email)}`);
    if (!res.ok) {
        console.error(`❌ Could not find user. Status: ${res.status}`);
        console.error(`   Make sure you registered at https://trusthub-frontend.onrender.com/register first.`);
        process.exit(1);
    }

    const user = await res.json();
    if (!user || !user.id) {
        console.error(`❌ No user found with email: ${email}`);
        process.exit(1);
    }

    console.log(`   Found user: ${user.id}`);

    // 2. Update role to admin
    const update = await fetch(`${API}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, role: "admin" }),
    });

    if (!update.ok) {
        const text = await update.text();
        console.error(`❌ Failed to update role: ${update.status} ${text}`);
        process.exit(1);
    }

    console.log(`✅ ${email} is now an admin!`);
    console.log(`\n🌐 Log in at https://trusthub-frontend.onrender.com/login`);
    console.log(`   Then visit https://trusthub-frontend.onrender.com/admin\n`);
}

makeAdmin().catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
});
