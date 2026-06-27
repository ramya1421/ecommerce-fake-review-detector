import { API_BASE } from "@/lib/api";
import {
  StockAvailabillity,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import {
  FiShare2,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiChevronRight,
} from "react-icons/fi";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  // Fetch product — unchanged backend call
  const data = await fetch(
    `${API_BASE}/api/slugs/${params.productSlug}`,
    { cache: "no-store" }
  );
  const product = await data.json();

  if (!product || product.error) {
    notFound();
  }

  // Fetch product images
  const imagesData = await fetch(
    `${API_BASE}/api/images/${product.id}`,
    { cache: "no-store" }
  );
  const images: ImageItem[] = await imagesData.json();

  const originalPrice = Math.round(product.price * 1.2);
  const discountPct = 17;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="section-container py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <FiChevronRight className="text-slate-300 text-xs" />
            <Link href="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
            <FiChevronRight className="text-slate-300 text-xs" />
            {product?.category?.name && (
              <>
                <Link
                  href={`/shop/${product.category.name.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors capitalize"
                >
                  {product.category.name}
                </Link>
                <FiChevronRight className="text-slate-300 text-xs" />
              </>
            )}
            <span className="text-slate-800 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="section-container py-10">
        {/* Main product section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 lg:p-10 mb-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ── Images column ── */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center group">
                {discountPct > 0 && (
                  <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{discountPct}%
                  </span>
                )}
                <Image
                  src={
                    product?.mainImage
                      ? `/${product?.mainImage}`
                      : "/product_placeholder.jpg"
                  }
                  width={480}
                  height={480}
                  alt={product?.title}
                  className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Thumbnail strip */}
              {images?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {/* Show main image as first thumb */}
                  <div className="w-16 h-16 rounded-xl border-2 border-blue-500 overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer">
                    <Image
                      src={
                        product?.mainImage
                          ? `/${product?.mainImage}`
                          : "/product_placeholder.jpg"
                      }
                      width={64}
                      height={64}
                      alt="main"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  {images.map((img) => (
                    <div
                      key={img.imageID}
                      className="w-16 h-16 rounded-xl border border-slate-200 hover:border-blue-400 overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <Image
                        src={`/${img.image}`}
                        width={64}
                        height={64}
                        alt="product view"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info column ── */}
            <div className="flex flex-col gap-5">
              {/* Category + title */}
              {product?.category?.name && (
                <Link
                  href={`/shop/${product.category.name.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-wide text-blue-600 hover:text-blue-700"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {product?.title}
              </h1>

              {/* Rating */}
              <SingleProductRating rating={product?.rating} />

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  ${product?.price}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {discountPct}%
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Stock */}
              <StockAvailabillity stock={94} inStock={product?.inStock} />

              {/* Description snippet */}
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                {product?.description}
              </p>

              {/* Quantity + cart buttons */}
              <SingleProductDynamicFields product={product} />

              {/* Wishlist */}
              <AddToWishlistBtn product={product} slug={params.productSlug} />

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: FiTruck,
                    title: "Free Shipping",
                    sub: "On orders over $50",
                  },
                  {
                    icon: FiRotateCcw,
                    title: "30-Day Returns",
                    sub: "Hassle-free returns",
                  },
                  {
                    icon: FiShield,
                    title: "AI Verified",
                    sub: "Authentic reviews",
                  },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="flex flex-col items-center gap-1.5 p-3 bg-slate-50 rounded-xl text-center"
                  >
                    <b.icon className="text-blue-600 text-base" />
                    <p className="text-[11px] font-semibold text-slate-700">
                      {b.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{b.sub}</p>
                  </div>
                ))}
              </div>

              {/* SKU + share */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>
                  SKU:{" "}
                  <span className="font-mono text-slate-600">ABCCD-18</span>
                </span>
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium">
                  <FiShare2 className="text-xs" /> Share
                </button>
              </div>

              {/* Payment icons */}
              <div className="flex items-center gap-2 pt-1">
                {["visa", "mastercard", "ae", "paypal"].map((card) => (
                  <div
                    key={card}
                    className="h-6 px-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-center"
                  >
                    <Image
                      src={`/${card}.svg`}
                      width={32}
                      height={20}
                      alt={card}
                      className="h-4 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs (Description / Info / Reviews with AI detection) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card pb-8">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
