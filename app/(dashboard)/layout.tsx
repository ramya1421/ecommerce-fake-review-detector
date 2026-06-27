import { API_BASE } from "@/lib/api";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: {
    user: { name: string; email: string; image: string };
  } | null = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const email: string = session?.user?.email;

  try {
    const res = await fetch(
      `${API_BASE}/api/users/email/${email}`,
      { cache: "no-store" }
    );
    const data = await res.json();

    if (data.role === "user") {
      redirect("/");
    }
  } catch (_) {
    // If backend is offline during build/dev, allow through
  }

  return <>{children}</>;
}
