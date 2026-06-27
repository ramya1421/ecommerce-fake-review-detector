"use client";

import { API_BASE } from "@/lib/api";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";

interface AddToWishlistBtnProps {
  product: Product;
  slug: string;
}

const AddToWishlistBtn = ({ product, slug }: AddToWishlistBtnProps) => {
  const { data: session } = useSession();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const [isInWishlistState, setIsInWishlistState] = useState<boolean>(false);

  const addToWishlistFun = async () => {
    if (!session?.user?.email) {
      toast.error("Please sign in to save products to your wishlist");
      return;
    }
    fetch(`${API_BASE}/api/users/email/${session.user.email}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) =>
        fetch(`${API_BASE}/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product?.id, userId: data?.id }),
        })
      )
      .then(() => {
        addToWishlist({
          id: product?.id,
          title: product?.title,
          price: product?.price,
          image: product?.mainImage,
          slug: product?.slug,
          stockAvailabillity: product?.inStock,
        });
        toast.success("Saved to wishlist!");
      });
  };

  const removeFromWishlistFun = async () => {
    if (!session?.user?.email) return;
    fetch(`${API_BASE}/api/users/email/${session.user.email}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) =>
        fetch(`${API_BASE}/api/wishlist/${data?.id}/${product?.id}`, { method: "DELETE" })
      )
      .then(() => {
        removeFromWishlist(product?.id);
        toast.success("Removed from wishlist");
      });
  };

  const checkIsInWishlist = async () => {
    if (!session?.user?.email) return;
    fetch(`${API_BASE}/api/users/email/${session.user.email}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) =>
        fetch(`${API_BASE}/api/wishlist/${data?.id}/${product?.id}`)
      )
      .then((r) => r.json())
      .then((data) => setIsInWishlistState(!!data[0]?.id));
  };

  useEffect(() => {
    checkIsInWishlist();
  }, [session?.user?.email, wishlist]);

  return (
    <button
      onClick={isInWishlistState ? removeFromWishlistFun : addToWishlistFun}
      className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all duration-200 ${isInWishlistState
          ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-red-500 hover:border-red-200"
        }`}
    >
      <FiHeart
        className={`text-base ${isInWishlistState ? "fill-red-500 text-red-500" : ""}`}
      />
      {isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default AddToWishlistBtn;
