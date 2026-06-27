import { API_BASE } from "@/lib/api";
import React from "react";
import ProductItem from "./ProductItem";
import { FiPackage } from "react-icons/fi";

const Products = async ({ slug }: any) => {
  const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

  let stockMode: string = "lte";
  if (inStockNum === 1) stockMode = "equals";
  if (outOfStockNum === 1) stockMode = "lt";
  if (inStockNum === 1 && outOfStockNum === 1) stockMode = "lte";
  if (inStockNum === 0 && outOfStockNum === 0) stockMode = "gt";

  let products: Product[] = [];
  try {
    const res = await fetch(
      `${API_BASE}/api/products?filters[price][$lte]=${slug?.searchParams?.price || 3000
      }&filters[rating][$gte]=${Number(slug?.searchParams?.rating) || 0
      }&filters[inStock][$${stockMode}]=1&${slug?.params?.slug?.length > 0
        ? `filters[category][$equals]=${slug?.params?.slug}&`
        : ""
      }sort=${slug?.searchParams?.sort}&page=${page}`,
      { cache: "no-store" }
    );
    if (res.ok) products = await res.json();
  } catch (_) {
    // backend offline
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiPackage className="text-3xl text-slate-400" />
        </div>
        <p className="text-lg font-semibold text-slate-600">No products found</p>
        <p className="text-sm text-slate-400 mt-1">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
