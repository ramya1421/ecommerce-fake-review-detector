"use client";
import React, { useState } from "react";
import RatingPercentElement from "./RatingPercentElement";
import SingleReview from "./SingleReview";
import ReviewSection from "./ReviewSection"; // ✅ Added
import AddReview from "./AddReview"; // ✅ Added
import { formatCategoryName } from "@/utils/categoryFormating";

const ProductTabs = ({ product }: { product: Product }) => {
  const [currentProductTab, setCurrentProductTab] = useState<number>(0);

  return (
    <div className="px-5 text-black">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab text-lg text-black pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${
            currentProductTab === 0 && "tab-active"
          }`}
          onClick={() => setCurrentProductTab(0)}
        >
          Description
        </a>
        <a
          role="tab"
          className={`tab text-black text-lg pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${
            currentProductTab === 1 && "tab-active"
          }`}
          onClick={() => setCurrentProductTab(1)}
        >
          Additional info
        </a>
        <a
          role="tab"
          className={`tab text-black text-lg pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${
            currentProductTab === 2 && "tab-active"
          }`}
          onClick={() => setCurrentProductTab(2)}
        >
          Reviews
        </a>
      </div>

      <div className="pt-5">
        {/* Description Tab */}
        {currentProductTab === 0 && (
          <p className="text-lg max-sm:text-base max-sm:text-sm">
            {product?.description}
          </p>
        )}

        {/* Additional Info Tab */}
        {currentProductTab === 1 && (
          <div className="overflow-x-auto">
            <table className="table text-xl text-center max-[500px]:text-base">
              <tbody>
                <tr>
                  <th>Manufacturer:</th>
                  <td>{product?.manufacturer}</td>
                </tr>
                <tr>
                  <th>Category:</th>
                  <td>
                    {product?.category?.name
                      ? formatCategoryName(product?.category?.name)
                      : "No category"}
                  </td>
                </tr>
                <tr>
                  <th>Color:</th>
                  <td>Silver, LightSlateGray, Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        
        {currentProductTab === 2 && (
          <div className="flex flex-col gap-8">
            <ReviewSection productId={product.id} />
            <AddReview productId={product.id} userId={"dummy-user-id"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
