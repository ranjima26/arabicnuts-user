"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

const allProducts = products;

const tabs = ["All", "Dates", "Nuts", "Spices"];

export function BestSellers() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (product: any) => {
    // Parse price string like "₹ 899" to number 899
    const priceValue =
      typeof product.price === "string"
        ? Number(product.price.replace(/[^\d]/g, ""))
        : product.price;

    dispatch(
      addToCart({
        _id: product.id,
        name: product.name,
        image: product.images[0],
        price: priceValue,
        qty: 1,
      })
    );

    router.push("/cart");
  };

  if (!isMounted) return null;

  const filteredProducts =
    activeTab === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeTab);

  return (
    <section
      className="py-16 md:py-24 lg:py-32 bg-white relative font-sans"
      id="best-sellers"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-xs md:text-sm lg:text-base text-gray-400 font-light mb-1 tracking-widest uppercase">
            Best Sellers
          </h2>

          <h3 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-[#65615e] uppercase tracking-wide leading-tight">
            Our Most Loved <br className="hidden md:block" />
            Selections
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 md:py-2 rounded-full text-[13px] md:text-sm font-bold transition-all ${activeTab === tab
                  ? "bg-[#dea424] text-white border-2 border-[#dea424] shadow-md hover:bg-[#c99119]"
                  : "bg-white text-[#65615e] border border-gray-200 hover:border-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="bg-[#f8faeb] border border-[#e6eed4] rounded-[24px] flex p-3 md:p-4 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:shadow-md active:-translate-y-0.5 transition-all duration-300 cursor-pointer animate-in fade-in zoom-in"
            >
              {/* Image side */}
              <div className="w-[45%] flex items-center justify-center p-1 md:p-2">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>

              <div className="w-[55%] flex flex-col justify-center py-1 pl-1 pr-1 md:pr-2">
                <h4 className="text-[20px] md:text-[22px] font-extrabold text-[#3a3a3a] leading-[1.1] mb-2 tracking-tight">
                  <span className="block">{product.name}</span>
                </h4>

                <p className="text-[10px] md:text-[11px] text-[#6b6b6b] leading-tight mb-2 pr-2 font-medium truncate">
                  {product.subtitle}
                </p>

                <span className="text-[11px] md:text-xs font-bold text-[#555555] mb-3 md:mb-4">
                  {product.weight}
                </span>

                <div className="flex items-center gap-3">
                  <div className="bg-[#dea424] text-white px-3 py-1 rounded-full text-[13px] md:text-sm font-bold shadow-sm inline-flex items-center justify-center">
                    {product.price}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#65615e] flex items-center justify-center text-white hover:bg-[#4a4745] transition-colors shadow-sm cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}