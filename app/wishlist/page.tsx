"use client";
import { API_BASE } from "@/lib/api";
import { WishItem } from "@/components";
import React, { useEffect } from "react";
import { useWishlistStore } from "../_zustand/wishlistStore";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

const WishlistPage = () => {
  const { data: session, status } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`${API_BASE}/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    const productArray = data.map((item: any) => ({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
    }));
    setWishlist(productArray);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`${API_BASE}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => getWishlistByUserId(data?.id));
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="section-container py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <FiHeart className="text-red-500" /> Wishlist
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {wishlist.length === 0
                ? "No saved items yet"
                : `${wishlist.length} saved item${wishlist.length > 1 ? "s" : ""}`}
            </p>
          </div>
          {wishlist.length > 0 && (
            <Link href="/shop" className="btn-secondary-custom text-sm flex items-center gap-2">
              <FiShoppingBag className="text-sm" /> Continue Shopping
            </Link>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="card-premium p-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-3xl text-red-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Save products you love to come back to them later.
            </p>
            <Link href="/shop" className="btn-primary-custom inline-flex items-center gap-2">
              <FiShoppingBag className="text-sm" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 w-16">
                      Image
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Product
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">
                      Stock Status
                    </th>
                    <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                    <th className="py-4 px-5 w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {wishlist.map((item) => (
                    <WishItem
                      key={nanoid()}
                      id={item?.id}
                      title={item?.title}
                      price={item?.price}
                      image={item?.image}
                      slug={item?.slug}
                      stockAvailabillity={item?.stockAvailabillity}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
