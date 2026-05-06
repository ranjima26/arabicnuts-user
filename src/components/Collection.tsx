"use client";
import { motion } from "motion/react";
import imgDates from "../assets/Container.png";
import imgAlmonds from "../assets/Margin.png";
import imgPistachios from "../assets/Margin-1.png";
import imgCashews from "../assets/Margin-2.png";
import imgFigs from "../assets/Margin-3.png";
import imgChocolates from "../assets/Margin-4.png";
import imgSpices from "../assets/Margin-5.png";

const bentoItems = [
  { name: "Almonds", img: imgAlmonds },
  { name: "Pistachios", img: imgPistachios },
  { name: "Cashews", img: imgCashews },
  { name: "Figs", img: imgFigs },
  { name: "Chocolates", img: imgChocolates },
  { name: "Spices", img: imgSpices },
];

export function Collection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="collections">
      <div className="w-full max-w-[1280px] px-4 md:px-8 mx-auto relative z-10 flex flex-col gap-12 lg:gap-20">
        
        {/* Section Title matching ShopPage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[#65615e] font-light text-2xl md:text-[40px] uppercase tracking-wider mb-2">Shop</h2>
          <h1 className="text-[#65615e] font-medium text-4xl md:text-[70px] leading-tight uppercase mb-6">Premium Collection</h1>
          <p className="text-[#5e604d] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Experience the heritage of the Orient through our meticulously sourced, hand-picked selection of the world's finest dry fruits and delicacies.
          </p>
        </motion.div>

        {/* Category Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {/* Large Card */}
          <div className="lg:col-span-1 lg:row-span-2 bg-[#f4ebd0]/30 backdrop-blur-sm rounded-[24px] overflow-hidden border border-[#d0c5af]/20 p-6 md:p-8 flex flex-col relative min-h-[300px] lg:min-h-full group hover:shadow-xl transition-all cursor-pointer">
            <div className="z-10 relative">
              <p className="text-[#735c00] font-bold text-xs uppercase tracking-widest mb-2">Signature</p>
              <h3 className="text-[#1b1d0e] font-bold text-3xl">Premium Dates</h3>
            </div>
            <div className="absolute -bottom-9 -right-9 w-[265px] h-[265px] md:w-[310px] md:h-[310px] group-hover:scale-105 transition-transform duration-500">
              <img 
                src={imgDates.src} 
                alt="Premium Dates" 
                className="w-full h-full object-contain rotate-[10deg] drop-shadow-xl" 
              />
            </div>
          </div>

          {/* Small Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
            {bentoItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f4ebd0]/30 backdrop-blur-sm rounded-[16px] border border-[#d0c5af]/20 p-4 sm:p-6 flex flex-col items-center justify-center gap-4 hover:bg-[#f4ebd0]/50 transition-colors cursor-pointer group aspect-square sm:aspect-auto sm:h-auto"
              >
                <div 
                  className="w-18 h-18 sm:w-22 sm:h-22 overflow-hidden flex items-center justify-center rounded-3xl group-hover:scale-105 transition-all duration-500 shadow-sm"
                >
                  <img 
                    src={item.img.src} 
                    alt={item.name} 
                    className="w-full h-full object-cover scale-135 translate-y-1.5" 
                  />
                </div>
                <p className="text-[#1b1d0e] font-bold text-xs sm:text-sm uppercase tracking-widest text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}