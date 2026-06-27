"use client";
import React, { useState } from "react";
import QuantityInput from "./QuantityInput";
import AddToCartSingleProductBtn from "./AddToCartSingleProductBtn";
import BuyNowSingleProductBtn from "./BuyNowSingleProductBtn";

const SingleProductDynamicFields = ({ product }: { product: Product }) => {
  const [quantityCount, setQuantityCount] = useState<number>(1);

  return (
    <div className="flex flex-col gap-4">
      <QuantityInput
        quantityCount={quantityCount}
        setQuantityCount={setQuantityCount}
      />
      {Boolean(product.inStock) && (
        <div className="flex flex-wrap gap-3">
          <AddToCartSingleProductBtn
            quantityCount={quantityCount}
            product={product}
          />
          <BuyNowSingleProductBtn
            quantityCount={quantityCount}
            product={product}
          />
        </div>
      )}
      {!Boolean(product.inStock) && (
        <p className="text-sm text-red-500 font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          This product is currently out of stock.
        </p>
      )}
    </div>
  );
};

export default SingleProductDynamicFields;
