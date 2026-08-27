"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";

interface Product {
  id: string;
  title: string;
  price: number;
  mainImage: string;
  slug: string;
  inStock: boolean | number;
  rating?: number;
  category?: { name: string };
  _count?: { reviews: number };
}

interface ProductItemProps {
  product: Product;
  color?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const rating = product.rating ?? 4;
  // Use real review count from DB (_count included by the products API).
  // No Math.random() — that causes SSR/client hydration mismatches.
  const reviewsCount = product._count?.reviews ?? 0;
  // Simulate original price for discount display
  const originalPrice = Math.round(product.price * 1.2);
  const discountPct = 17;
  const inStock =
    typeof product.inStock === "number"
      ? product.inStock > 0
      : !!product.inStock;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Discount badge */}
      {discountPct > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          -{discountPct}%
        </span>
      )}

      {/* Wishlist button */}
      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <FiHeart className="text-sm" />
      </button>

      {/* Quick view */}
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-x-0 bottom-16 z-10 mx-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
      >
        <FiEye className="text-sm" /> Quick View
      </Link>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block p-4 pt-5">
        <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={
              !imgError && product.mainImage
                ? `/${product.mainImage}`
                : "/product_placeholder.jpg"
            }
            alt={product.title}
            width={240}
            height={240}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col gap-2 flex-1">
        {/* Category chip */}
        {product.category?.name && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full w-fit">
            {product.category.name}
          </span>
        )}

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-800 leading-snug hover:text-blue-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <FiStar
              key={i}
              className={`text-xs ${i <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-200"
                }`}
            />
          ))}
          <span className="text-xs text-slate-400 ml-1">
            {rating.toFixed(1)} ({reviewsCount})
          </span>
        </div>

        {/* Price + stock */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${originalPrice}
            </span>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${inStock
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-500"
              }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Add to cart */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl active:scale-[.98] transition-all duration-200"
        >
          <FiShoppingCart className="text-sm" />
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
