"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  price: number;
  mainImage: string;
  slug: string;
  inStock: boolean;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  // Static rating & reviews (temporary)
  const rating = 4.2;
  const reviewsCount = 12;

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200 bg-white">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain mx-auto cursor-pointer"
        />
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">
            {product.title}
          </h2>
        </Link>

        <p className="text-xl font-bold text-black mt-2">${product.price}</p>

        {/* Static ⭐ Rating + Reviews */}
        <div className="flex items-center justify-center mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar
              key={i}
              className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}</span>
          <span className="ml-1 text-xs text-gray-500">({reviewsCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
