"use client";

import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

const AddToCartSingleProductBtn = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center gap-2 btn-primary-custom w-full sm:w-auto"
    >
      <FiShoppingCart className="text-base" />
      Add to Cart
    </button>
  );
};

export default AddToCartSingleProductBtn;
