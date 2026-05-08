"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Star } from "lucide-react";

import imgVarietyNutsBowls1 from "figma:asset/5e72bbb9a47ea7e8217a8f2a210b8120d125dbfc.png";
import imgObject from "figma:asset/4e138d87f88df0007c9807655df9185a27fcb39e.png";
import imgObject1 from "figma:asset/aac24150bf0e4fe83a245fc50f804619dbda80f7.png";

const products = [
  {
    name: "Blanched Peanuts",
    title1: "BLANCHED",
    title2: "PEANUTS",
    rating: "4.5",
    desc: "Smooth, skinless peanuts with a clean mild taste. Perfect for snacking, sweets, and cooking. High in protein and healthy fats.",
    thumbPos: { left: "0.07%", top: "-5.05%" },
    mainPos: { left: "0.07%", top: "-5.05%" },
    btnColor:
      "bg-[#d39b16] hover:bg-[#b88610] shadow-[0_4px_15px_rgba(211,155,22,0.4)] hover:shadow-[0_6px_20px_rgba(211,155,22,0.6)]",
  },
  {
    name: "Raw Peanuts",
    title1: "RAW",
    title2: "PEANUTS",
    rating: "3.5",
    desc: "Natural whole peanuts with skin intact for maximum nutrients. Crunchy, earthy flavor ideal for roasting or traditional recipes.",
    thumbPos: { left: "-99.93%", top: "-5.05%" },
    mainPos: { left: "-98.86%", top: "-5.05%" },
    btnColor:
      "bg-[#496506] hover:bg-[#3d5405] shadow-[0_4px_15px_rgba(73,101,6,0.4)] hover:shadow-[0_6px_20px_rgba(73,101,6,0.6)]",
  },
  {
    name: "Chickpeas",
    title1: "ROASTED",
    title2: "CHICKPEAS",
    rating: "3.5",
    desc: "Crunchy roasted chickpeas with a nutty flavor. High-protein snack that keeps you full longer.",
    thumbPos: { left: "-196.93%", top: "-116.16%" },
    mainPos: { left: "-195.11%", top: "-116.99%" },
    btnColor:
      "bg-[#496506] hover:bg-[#3d5405] shadow-[0_4px_15px_rgba(73,101,6,0.4)] hover:shadow-[0_6px_20px_rgba(73,101,6,0.6)]",
  },
  {
    name: "Almonds",
    title1: "PREMIUM",
    title2: "ALMONDS",
    rating: "3.5",
    desc: "Rich, buttery nuts with a deep roasted aroma. Great for desserts, chocolate pairings, or luxury snacking.",
    thumbPos: { left: "-97.93%", top: "-116.16%" },
    mainPos: { left: "-98.06%", top: "-116.99%" },
    btnColor:
      "bg-[#496506] hover:bg-[#3d5405] shadow-[0_4px_15px_rgba(73,101,6,0.4)] hover:shadow-[0_6px_20px_rgba(73,101,6,0.6)]",
  },
  {
    name: "Cashews",
    title1: "PREMIUM",
    title2: "CASHEWS",
    rating: "3.5",
    desc: "Large, whole cashew nuts with a creamy texture and sweet, buttery flavor. Perfect for healthy snacking or culinary use.",
    thumbPos: { left: "-0.93%", top: "-116.16%" },
    mainPos: { left: "-0.19%", top: "-116.99%" },
    btnColor:
      "bg-[#496506] hover:bg-[#3d5405] shadow-[0_4px_15px_rgba(73,101,6,0.4)] hover:shadow-[0_6px_20px_rgba(73,101,6,0.6)]",
  },
  {
    name: "Black Peanuts",
    title1: "BLACK",
    title2: "PEANUTS",
    rating: "3.5",
    desc: "Rare black-skinned peanuts packed with antioxidants. A unique, slightly sweeter and more earthy taste than regular peanuts.",
    thumbPos: { left: "0.07%", top: "-234.68%" },
    mainPos: { left: "-0.19%", top: "-232.41%" },
    btnColor:
      "bg-[#496506] hover:bg-[#3d5405] shadow-[0_4px_15px_rgba(73,101,6,0.4)] hover:shadow-[0_6px_20px_rgba(73,101,6,0.6)]",
  },
];

const floatingNuts = [
  {
    src: imgObject,
    className: "w-16 md:w-20 top-[10%] left-[8%] rotate-[45deg]",
    delay: 0,
  },
  {
    src: imgObject1,
    className: "w-12 md:w-16 top-[20%] right-[12%] -rotate-[30deg]",
    delay: 1,
  },
  {
    src: imgObject,
    className: "w-14 md:w-24 bottom-[25%] left-[12%] rotate-[120deg]",
    delay: 2,
  },
  {
    src: imgObject1,
    className: "w-10 md:w-14 bottom-[30%] right-[10%] -rotate-[15deg]",
    delay: 1.5,
  },
];

export function BlanchedPeanuts() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-16 lg:py-24 flex flex-col justify-center font-['Roboto',sans-serif]">
      {/* Background Glow */}
      <div className="absolute top-[5%] left-[15%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#fcf9eb] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Floating Elements */}
      {/* Floating Elements */}
      {floatingNuts.map((nut, i) => (
        <motion.div
          key={i}
          className={`absolute z-0 pointer-events-none drop-shadow-xl ${nut.className}`}
          animate={{
            y: ["-15px", "15px", "-15px"],
            rotate: ["0deg", "10deg", "0deg"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: nut.delay,
          }}
        >
          <Image
            src={nut.src}
            alt=""
            width={120}
            height={120}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center max-w-6xl">
        {/* Main Product Showcase */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 flex-grow mb-8 lg:mb-16">
          {/* Left: Interactive Image */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative">
            <div
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[374px]"
              style={{ aspectRatio: "374/402" }}
            >
              {/* Static ground shadow */}
              <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-[220px] md:w-[280px] h-[30px] bg-black/15 blur-[20px] rounded-[100%] z-[0]" />

              <AnimatePresence>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.85, x: -30, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, x: 30, rotate: 15 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-hidden z-10"
                >
                  <Image
                    src={imgVarietyNutsBowls1}
                    alt={products[activeIndex].name}
                    fill
                    className="absolute max-w-none object-contain"
                    style={{
                      height: "347.47%",
                      width: "296.59%",
                      left: products[activeIndex].mainPos.left,
                      top: products[activeIndex].mainPos.top,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center lg:items-start w-full"
              >
                {/* Rating Badge */}
                <div className="inline-flex items-center justify-center gap-1.5 bg-[#b5df85] px-4 py-1.5 rounded-[30px] mb-4 shadow-sm">
                  <span className="text-[#65615e] font-bold text-xl md:text-2xl leading-none mt-0.5">
                    {products[activeIndex].rating}
                  </span>

                  <Star className="w-4 h-4 md:w-[18px] md:h-[18px] fill-[#65615e] text-[#65615e]" />
                </div>

                {/* Typography Block */}
                <h2 className="text-[40px] sm:text-5xl md:text-6xl lg:text-[75px] font-light text-[#65615e] uppercase leading-[1] mb-0 tracking-tight">
                  {products[activeIndex].title1}
                </h2>

                <h3 className="text-[45px] sm:text-6xl md:text-7xl lg:text-[80px] font-bold text-[#65615e] uppercase leading-[0.9] mb-6 tracking-tighter drop-shadow-sm">
                  {products[activeIndex].title2}
                </h3>

                {/* Description */}
                <p className="text-[#373737] text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed max-w-[325px] mb-8 min-h-[60px] lg:min-h-[80px]">
                  {products[activeIndex].desc}
                </p>

                {/* Button */}
                <button
                  className={`text-white px-8 md:px-10 py-3 rounded-[25px] font-medium text-[15px] md:text-[16px] transition-all duration-300 ${products[activeIndex].btnColor}`}
                >
                  Shop Now
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Thumbnail Navigation */}
        <div className="w-full flex justify-center mt-auto z-20">
          <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-6 pt-4 px-4 snap-x snap-mandatory w-full max-w-5xl justify-start lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((prod, idx) => {
              const isActive = idx === activeIndex;
              const nameParts = prod.name.split(" ");

              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex flex-col items-center justify-start w-[90px] sm:w-[110px] md:w-[125px] h-[135px] sm:h-[155px] md:h-[175px] pt-4 px-2 gap-3 shrink-0 snap-center group rounded-[25px] transition-all duration-300 outline-none ${isActive
                      ? "border-[0.5px] border-[#8c8b8a]/75 bg-transparent scale-[1.05] shadow-[0_4px_15px_rgba(0,0,0,0.02)]"
                      : "border-[0.5px] border-transparent hover:border-[#8c8b8a]/30 hover:bg-black/[0.01] hover:scale-[1.02]"
                    }`}
                >
                  <div
                    className="relative w-[65px] sm:w-[80px] md:w-[100px]"
                    style={{ aspectRatio: "100/108" }}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <Image
                        src={imgVarietyNutsBowls1}
                        alt={prod.name}
                        fill
                        className={`absolute max-w-none object-contain transition-transform duration-500 origin-center ${isActive ? "" : "group-hover:scale-110"
                          }`}
                        style={{
                          height: "347.47%",
                          width: "296.59%",
                          left: prod.thumbPos.left,
                          top: prod.thumbPos.top,
                        }}
                      />
                    </div>
                  </div>

                  <span
                    className={`text-[11px] sm:text-[13px] md:text-[14px] font-medium text-center leading-[1.2] transition-colors ${isActive
                        ? "text-[#373737]"
                        : "text-[#8c8b8a] group-hover:text-[#373737]"
                      }`}
                  >
                    {nameParts[0]}
                    <br />
                    {nameParts.slice(1).join(" ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}