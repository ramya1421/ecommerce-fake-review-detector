"use client";

import { QuantityInputCart } from "@/components";
import Image from "next/image";
import React from "react";
import {
  FiCheck,
  FiClock,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";
import { useProductStore } from "../_zustand/store";
import Link from "next/link";
import toast from "react-hot-toast";

const CartPage = () => {
  const { products, removeFromCart, calculateTotals, total } =
    useProductStore();

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    calculateTotals();
    toast.success("Item removed from cart");
  };

  const shipping = 5;
  const tax = +(total / 5).toFixed(2);
  const orderTotal = total === 0 ? 0 : Math.round(total + tax + shipping);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="section-container py-12">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {products.length === 0
              ? "Your cart is empty"
              : `${products.length} item${products.length > 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {products.length === 0 ? (
          /* Empty state */
          <div className="card-premium p-16 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="text-3xl text-slate-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Looks like you haven&apos;t added any products yet.
            </p>
            <Link href="/shop" className="btn-primary-custom inline-flex items-center gap-2">
              <FiShoppingBag className="text-sm" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Cart items */}
            <div className="lg:col-span-7 space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="card-premium p-4 flex gap-4 animate-fade-in"
                >
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image
                      width={96}
                      height={96}
                      src={
                        product?.image
                          ? `/${product.image}`
                          : "/product_placeholder.jpg"
                      }
                      alt={product.title}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href="#" className="font-semibold text-slate-800 text-sm hover:text-blue-600 transition-colors line-clamp-2">
                        {product.title}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                    <p className="text-blue-600 font-bold mt-1">
                      ${product.price}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                      <FiCheck className="text-xs" /> In stock
                    </div>
                    <div className="mt-2">
                      <QuantityInputCart product={product} />
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="hidden sm:flex items-center text-sm font-bold text-slate-900 flex-shrink-0">
                    ${(product.price * product.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-5">
              <div className="card-premium p-6 sticky top-24 space-y-4">
                <h2 className="font-bold text-slate-900 text-base">
                  Order Summary
                </h2>

                {/* Coupon */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="input-premium pl-9 text-sm py-2.5"
                    />
                  </div>
                  <button className="btn-secondary-custom text-sm py-2.5 px-4">
                    Apply
                  </button>
                </div>

                <div className="space-y-3 text-sm border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <div className="flex items-center gap-1">
                      <span>Shipping</span>
                      <FiClock className="text-xs text-slate-400" />
                    </div>
                    <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (20%)</span>
                    <span className="font-medium text-slate-900">${tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-base border-t border-slate-100 pt-3">
                    <span>Total</span>
                    <span className="text-blue-600">${orderTotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 btn-primary-custom mt-2"
                >
                  Proceed to Checkout <FiArrowRight className="text-sm" />
                </Link>

                <Link
                  href="/shop"
                  className="w-full flex items-center justify-center gap-2 btn-secondary-custom text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
