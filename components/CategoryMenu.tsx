import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryMenuList } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";

const CategoryMenu = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Browse
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all <FiArrowRight />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoryMenuList.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 p-5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <Image
                  src={item.src}
                  width={36}
                  height={36}
                  alt={item.title}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 text-center transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
