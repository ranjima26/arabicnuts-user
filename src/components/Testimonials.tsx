"use client";
import testimonialImage from "@/assets/ead8983e47edd5d7cbe882b76eb16cf1fb20bf55.png";
import customer1 from "@/assets/76b1495ea793d0dee550cbf76acf759daa80302a.png";
import customer2 from "@/assets/63e0e0979ded08e8307c3fdf4338d4c15d1aa300.png";
import customer3 from "@/assets/5183e0871184644c2cf72801f961aa2bc5f11c5e.png";
import customer4 from "@/assets/1fa2756015abbcf59afc6bed1f3343d4736390f4.png";
import customer5 from "@/assets/0a570498e9760a2a3019c472ebb83802808c529a.png";
import customer6 from "@/assets/537e0c80cb683c7e20f666033172b7ca5bea2fc7.png";
import { motion } from "motion/react";

const avatars = [
  { src: customer1.src, x: -320, y: -80, size: 80 },
  { src: customer2.src, x: -220, y: 30, size: 90 },
  { src: customer3.src, x: -350, y: 130, size: 85 },
  { src: customer4.src, x: 280, y: -70, size: 80 },
  { src: customer5.src, x: 190, y: 60, size: 85 },
  { src: customer6.src, x: 340, y: 140, size: 90 },
];

const dots = [
  { x: -450, y: -30, size: 12 },
  { x: -380, y: -100, size: 35, opacity: 0.8 },
  { x: -280, y: 40, size: 20 },
  { x: -440, y: 150, size: 15 },
  { x: -220, y: 190, size: 18 },
  { x: 380, y: -40, size: 35, opacity: 0.8 },
  { x: 280, y: 50, size: 22 },
  { x: 480, y: -35, size: 12 },
  { x: 460, y: 160, size: 15 },
  { x: 230, y: 210, size: 18 },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Title Section */}
        <div className="text-center mb-10 md:mb-24 flex flex-col items-center">
          <h2 className="text-[#868381] text-xl md:text-[32px] font-light uppercase tracking-wider mb-1 md:mb-2">
            What Our
          </h2>
          <h3 className="text-[#65615e] text-3xl md:text-[70px] font-bold uppercase tracking-tight">
            Customers Say
          </h3>
        </div>

        {/* Desktop View: Scattered Avatars */}
        <div className="hidden md:flex relative w-full max-w-[1200px] h-[500px] items-center justify-center">
          {/* Decorative Dots */}
          {dots.map((dot, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute bg-[#373737] rounded-full"
              style={{ 
                width: dot.size, 
                height: dot.size,
                left: `calc(50% + ${dot.x}px)`,
                top: `calc(50% + ${dot.y}px)`,
                opacity: dot.opacity || 0.6
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: dot.opacity || 0.6 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}

          {/* Surrounding Avatars */}
          {avatars.map((avatar, i) => (
            <motion.div
              key={`avatar-${i}`}
              className="absolute rounded-full border-2 border-[#d4af37]/30 p-1 bg-white shadow-lg z-10 flex items-center justify-center overflow-hidden"
              style={{ 
                width: avatar.size, 
                height: avatar.size,
                left: `calc(50% + ${avatar.x}px)`,
                top: `calc(50% + ${avatar.y}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <img src={avatar.src} alt="Customer" className="w-full h-full object-cover rounded-full" />
            </motion.div>
          ))}

          {/* Center Featured Avatar */}
          <motion.div 
            className="relative z-20 w-56 h-56 rounded-full border-4 border-[#d4af37]/40 p-1.5 bg-white shadow-2xl flex items-center justify-center overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={testimonialImage.src}
              alt="Featured Review"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </div>

        {/* Mobile View: Vertical Flow */}
        <div className="md:hidden w-full flex flex-col items-center gap-8">
          {/* Featured Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-[#d4af37]/30 p-1.5 bg-white shadow-xl flex items-center justify-center overflow-hidden">
            <img 
              src={testimonialImage.src}
              alt="Featured Review"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-4 overflow-x-auto w-full px-4 no-scrollbar pb-2">
            {avatars.map((avatar, i) => (
              <img 
                key={i} 
                src={avatar.src} 
                className="w-16 h-16 rounded-full border-2 border-[#d4af37]/15 flex-shrink-0" 
                alt="Customer" 
              />
            ))}
          </div>

          {/* Text Section (integrated for better space) */}
          <div className="text-center px-4">
            <h4 className="text-[#373737] font-bold text-lg mb-1">Nadiya S., Bengaluru</h4>
            <p className="text-[#65615e] text-base italic font-light leading-relaxed">
              "Best Dry Fruits I've Purchased Online. Will Definitely Reorder."
            </p>
          </div>
        </div>

        {/* Desktop Testimonial Text Section */}
        <motion.div 
          className="hidden md:block text-center mt-24 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-[#373737] font-bold text-lg md:text-xl mb-1">Nadiya S., Bengaluru</h4>
          <p className="text-[#65615e] text-base md:text-xl italic font-light leading-relaxed">
            "Best Dry Fruits I've Purchased Online. Will Definitely Reorder."
          </p>
        </motion.div>

      </div>
    </section>
  );
}