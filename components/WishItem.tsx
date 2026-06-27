"use client";
import { API_BASE } from "@/lib/api";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2, FiShoppingCart, FiExternalLink } from "react-icons/fi";
import { useSession } from "next-auth/react";
import Link from "next/link";

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const { data: session } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const [userId, setUserId] = useState<string>();

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`${API_BASE}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => setUserId(data?.id));
    }
  };

  const deleteItemFromWishlist = async (productId: string) => {
    if (userId) {
      fetch(`${API_BASE}/api/wishlist/${userId}/${productId}`, {
        method: "DELETE",
      }).then(() => {
        removeFromWishlist(productId);
        toast.success("Removed from wishlist");
      });
    } else {
      toast.error("Please sign in to manage your wishlist");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      {/* Image */}
      <td className="py-3 px-5">
        <Link href={`/product/${slug}`}>
          <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
            <Image
              src={image ? `/${image}` : "/product_placeholder.jpg"}
              width={56}
              height={56}
              className="object-contain w-full h-full"
              alt={title}
            />
          </div>
        </Link>
      </td>

      {/* Name + price */}
      <td className="py-3 px-5">
        <Link href={`/product/${slug}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors text-sm flex items-center gap-1">
          {title}
          <FiExternalLink className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <p className="text-blue-600 font-bold text-sm mt-0.5">${price}</p>
      </td>

      {/* Stock */}
      <td className="py-3 px-5 hidden sm:table-cell">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stockAvailabillity
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-500"
            }`}
        >
          {stockAvailabillity ? "In Stock" : "Out of Stock"}
        </span>
      </td>

      {/* Add to cart */}
      <td className="py-3 px-5">
        <Link
          href={`/product/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiShoppingCart className="text-xs" /> Add to Cart
        </Link>
      </td>

      {/* Remove */}
      <td className="py-3 px-5">
        <button
          onClick={() => deleteItemFromWishlist(id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
          aria-label="Remove from wishlist"
        >
          <FiTrash2 className="text-sm" />
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
