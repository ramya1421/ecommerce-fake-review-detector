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

    if (!res.ok) {
      // Backend returned an error (4xx/5xx) — deny access
      redirect("/");
    }

    const data = await res.json();

    if (!data || data.role !== "admin") {
      redirect("/");
    }
  } catch (_) {
    // Backend is unreachable — fail CLOSED: deny access rather than allow through
    redirect("/");
  }

  return <>{children}</>;
}
