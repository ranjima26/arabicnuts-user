"use client";

import Image from "next/image";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-80z9twyba4";

import imgObject from "figma:asset/aac24150bf0e4fe83a245fc50f804619dbda80f7.png";
import imgChatGptImageFeb202026120533Pm1 from "figma:asset/db3a77284adce3df82a8cd0d088a6e9a4b0cfa4f.png";
import imgObject1 from "figma:asset/4e138d87f88df0007c9807655df9185a27fcb39e.png";

const floatingNuts = [
  {
    src: imgObject,
    delay: 0,
    className:
      "w-[80px] md:w-[110px] top-[10%] -left-[2%] md:left-[5%] rotate-[65deg]",
  },
  {
    src: imgObject1,
    delay: 1,
    className:
      "w-[60px] md:w-[80px] bottom-[15%] left-[2%] md:left-[8%] rotate-[32deg]",
  },
  {
    src: imgObject,
    delay: 2,
    className:
      "w-[90px] md:w-[110px] top-[10%] right-[0%] md:-right-[2%] rotate-[114deg]",
  },
  {
    src: imgObject1,
    delay: 1.5,
    className:
      "w-[60px] md:w-[75px] bottom-[15%] right-[2%] md:right-[5%] rotate-[92deg]",
  },
];

const whiteDots = [
  { top: "58%", left: "33%", size: "21px" },
  { top: "58%", left: "7%", size: "21px" },
  { top: "82%", left: "11%", size: "15px" },
  { top: "64%", left: "10%", size: "15px" },
  { top: "36%", left: "8%", size: "15px" },
  { top: "33%", left: "26%", size: "25px" },
  { top: "48%", left: "28%", size: "25px" },
  { top: "72%", left: "33%", size: "27px" },
  { top: "50%", left: "24%", size: "27px" },
  { top: "44%", left: "32%", size: "15px" },
];

export function GiftHampers() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white py-20 px-4 md:px-8 font-['Roboto',sans-serif]"
      id="gift-hampers"
    >
      {/* Main Banner Container */}
      <div className="relative w-full max-w-[1512px] mx-auto bg-[#496506] rounded-3xl min-h-[400px] lg:h-[361px] flex flex-col lg:flex-row items-center justify-between overflow-visible">
        
        {/* White Wave Background (Desktop Only) */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-[479px]">
          <svg
            className="absolute block h-full w-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 479 361"
          >
            <path d={svgPaths.p3d014580} fill="white" />
          </svg>
        </div>

        {/* White Wave Background (Mobile Fallback) */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-[60%] bg-white rounded-t-3xl rounded-b-[100px]"></div>

        {/* Decorative White Dots */}
        {whiteDots.map((dot, i) => (
          <motion.div
            key={i}
            className="hidden lg:block absolute bg-white rounded-full pointer-events-none"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}

        {/* Left Side */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start items-center h-full z-10 pt-12 lg:pt-0 pl-0 lg:pl-32">
          <motion.div
            className="relative w-[280px] md:w-[320px] h-[320px] lg:h-[366px] drop-shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 overflow-visible pointer-events-none flex items-center justify-center">
              <Image
                src={imgChatGptImageFeb202026120533Pm1}
                alt="Luxury Gift Hampers"
                width={700}
                height={700}
                className="w-[140%] h-auto max-w-none object-contain scale-110 lg:scale-[1.3] transform -translate-y-4"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-center z-10 px-6 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="font-light text-[32px] md:text-[40px] text-white leading-tight mb-0 uppercase tracking-wide">
              Luxury
            </h2>

            <h3 className="font-medium text-[45px] md:text-[60px] lg:text-[70px] text-white leading-[1.1] lg:leading-[60px] uppercase mb-4 tracking-tighter">
              Gift Hampers
            </h3>

            <p className="font-normal text-[16px] md:text-[20px] text-white/90 leading-relaxed mb-8 max-w-[450px]">
              Perfect for weddings, corporate gifting & festive celebrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="relative group overflow-hidden bg-transparent border border-white/40 hover:border-white h-[45px] md:h-[50px] w-full sm:w-[220px] rounded-full transition-all duration-300">
                <span className="relative z-10 font-medium text-[16px] text-white">
                  Explore Gift Collection
                </span>

                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="relative group overflow-hidden bg-[#e6edcf]/50 hover:bg-[#e6edcf]/70 h-[45px] md:h-[50px] w-full sm:w-[220px] rounded-full transition-all duration-300 backdrop-blur-sm">
                <span className="relative z-10 font-medium text-[16px] text-[#496506]">
                  Bulk Enquiry
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Nuts */}
        {floatingNuts.map((nut, i) => (
          <motion.div
            key={i}
            className={`absolute z-20 pointer-events-none drop-shadow-xl ${nut.className}`}
            animate={{
              y: ["-10px", "10px", "-10px"],
            }}
            transition={{
              duration: 4 + i,
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
              className="w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}