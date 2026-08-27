'use server'

import { API_BASE } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function deleteWishItem(id: string) {
  await fetch(`${API_BASE}/api/wishlist/${id}`, {
    method: "DELETE",
  });
  revalidateTag("wishlist");
}
