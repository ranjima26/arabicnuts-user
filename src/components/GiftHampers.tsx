"use client";
import { motion } from 'motion/react';
import svgPaths from "../imports/svg-80z9twyba4";
import imgObject from "@/assets/aac24150bf0e4fe83a245fc50f804619dbda80f7.png";
import imgChatGptImageFeb202026120533Pm1 from "@/assets/db3a77284adce3df82a8cd0d088a6e9a4b0cfa4f.png";
import imgObject1 from "@/assets/4e138d87f88df0007c9807655df9185a27fcb39e.png";

const floatingNuts = [
  // Top left (outside banner)
  { src: imgObject1, delay: 0, className: "w-[80px] md:w-[100px] -top-[50px] left-[5%] md:-left-[2%] rotate-[-15deg] z-20" },
  // Top left (inside banner)
  { src: imgObject1, delay: 1, className: "w-[50px] md:w-[70px] top-[10%] left-[8%] md:left-[4%] rotate-[15deg] z-20" },
  // Bottom left (huge almond outside)
  { src: imgObject, delay: 1.5, className: "w-[120px] md:w-[150px] lg:w-[180px] -bottom-[70px] left-[2%] md:left-[6%] rotate-[15deg] z-20" },
  // Top right (almond outside)
  { src: imgObject, delay: 2, className: "w-[70px] md:w-[90px] -top-[40px] right-[2%] md:-right-[2%] rotate-[110deg] z-20" },
  // Bottom right (pistachio outside)
  { src: imgObject1, delay: 1.2, className: "w-[80px] md:w-[100px] -bottom-[50px] right-[4%] md:right-[10%] rotate-[-25deg] z-20" },
];

const whiteDots = [
  { top: "60%", left: "34%", size: "18px" },
  { top: "62%", left: "5%", size: "22px" },
  { top: "40%", left: "10%", size: "14px" },
  { top: "35%", left: "27%", size: "25px" },
  { top: "45%", left: "32%", size: "16px" },
  { top: "52%", left: "25%", size: "28px" },
  { top: "75%", left: "32%", size: "20px" },
];

export function GiftHampers() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-32 px-4 md:px-8 font-sans" id="gift-hampers">
      
      {/* Main Banner Container */}
      <div className="relative w-full max-w-[1400px] mx-auto bg-[#4b6a09] rounded-[24px] min-h-[450px] lg:h-[400px] flex flex-col lg:flex-row items-center justify-between overflow-visible shadow-xl">
        
        {/* White Wave Background (Desktop Only) */}
        <div className="hidden lg:block absolute left-0 top-0 h-full pointer-events-none z-0">
          <svg className="block h-full w-auto min-w-[450px]" fill="none" preserveAspectRatio="xMinYMid slice" viewBox="0 0 479 361">
            <path d={svgPaths.p3d014580} fill="white" />
          </svg>
        </div>

        {/* White Wave Background (Mobile Fallback) */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-[45%] bg-white rounded-t-[24px] rounded-b-[80px] shadow-sm pointer-events-none z-0"></div>

        {/* Decorative White Dots */}
        {whiteDots.map((dot, i) => (
          <motion.div
            key={i}
            className="hidden lg:block absolute bg-white rounded-full pointer-events-none z-10"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}

        {/* Left Side: Product Image */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center h-full z-20 pt-10 lg:pt-0 pb-0 px-4 lg:pl-[8%] xl:pl-[10%]">
          <motion.div 
            className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-none lg:w-[460px] drop-shadow-2xl flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img 
              alt="Luxury Gift Hampers" 
              className="w-full h-auto object-contain lg:scale-[1.15] lg:-translate-y-2 lg:translate-x-14" 
              src={imgChatGptImageFeb202026120533Pm1.src} 
            />
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center text-center z-10 px-4 md:px-8 py-8 lg:py-0 pb-16 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="font-light text-[20px] sm:text-[24px] md:text-[32px] text-white leading-tight mb-0 md:mb-1 uppercase tracking-wide">
              Luxury
            </h2>
            <h3 className="font-extrabold text-[32px] sm:text-[48px] md:text-[54px] lg:text-[68px] text-white leading-[1.1] uppercase mb-4 tracking-tighter">
              Gift Hampers
            </h3>
            <p className="font-medium text-[14px] sm:text-[16px] md:text-[18px] text-white leading-snug mb-8 max-w-[420px]">
              Perfect For Weddings, Corporate Gifting &<br className="hidden sm:block" />
              Festive Celebrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              {/* Explore Button */}
              <button className="relative group overflow-hidden bg-transparent border border-white hover:bg-white/10 h-[45px] md:h-[48px] w-full sm:w-[220px] rounded-full transition-all duration-300">
                <span className="relative z-10 font-bold text-[14px] md:text-[15px] text-white tracking-wide">
                  Explore Gift Collection
                </span>
              </button>

              {/* Bulk Enquiry Button */}
              <button className="relative group overflow-hidden bg-[#9aab6f] hover:bg-[#8a9b5f] h-[45px] md:h-[48px] w-full sm:w-[220px] rounded-full transition-all duration-300 shadow-lg">
                <span className="relative z-10 font-bold text-[14px] md:text-[15px] text-[#334208] tracking-wide">
                  Bulk Enquiry
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Ambient Nuts */}
        {floatingNuts.map((nut, i) => (
          <motion.img
            key={i}
            src={nut.src}
            alt=""
            className={`absolute pointer-events-none drop-shadow-xl ${nut.className}`}
            animate={{ 
              y: ["-8px", "8px", "-8px"]
            }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: nut.delay }}
          />
        ))}

      </div>
    </section>
  );
}
