"use client";
import { motion } from "motion/react";
import { WhyArabic } from "./WhyArabic";
import imgBgLogo from "@/assets/0a072b9885ca84a574ec1ed74c34c0098abc5ff1.png";
import { Star, Eye, Leaf, ShieldCheck, Recycle, ShieldPlus } from "lucide-react";
import Link from "next/link";

export function About() {
  return (
    <div className="w-full bg-[#fcfcfb] flex flex-col items-center overflow-x-hidden font-['Roboto',sans-serif]">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] pt-24 pb-16 md:pt-32 md:pb-24 px-4 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] overflow-hidden pointer-events-none z-0 flex justify-center opacity-[0.15]">
          <img 
            src={imgBgLogo.src} 
            alt="Watermark" 
            className="w-full object-cover object-top -translate-y-[10%]"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl"
        >
          <h2 className="text-[#8c8574] text-xl md:text-2xl font-light uppercase tracking-[0.2em] mb-4">
            Crafting
          </h2>
          <h1 className="text-[#65615e] text-4xl md:text-[60px] lg:text-[70px] font-medium uppercase leading-[1.1] mb-6 tracking-wide">
            Premium Quality<br />Dry Fruits
          </h1>
          <p className="text-[#5e604d] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            From sourcing to packaging — every step is designed to deliver purity, freshness, and taste you can trust.
          </p>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full max-w-[1280px] px-4 md:px-8 py-16 md:py-20 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[#735c00] text-xs font-bold uppercase tracking-[0.1em] mb-4 block">Curated Selection</span>
          <h2 className="text-[#1b1d0e] text-3xl md:text-5xl font-bold mb-8 tracking-tight">Who We Are</h2>
          <div className="text-[#373737] text-lg md:text-xl leading-relaxed space-y-6 font-light">
            <p>
              Arabic Dry Fruits is a premium dry fruits brand focused on delivering high-quality, handpicked nuts and natural products sourced from trusted farms.
            </p>
            <p>
              We believe that healthy eating should never compromise on taste or quality. Every product is carefully selected, cleaned, and packed to maintain its natural goodness.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full bg-[#fdfaf2] py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white rounded-[48px] p-10 md:p-14 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] border border-[#f0eee4] flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full bg-[#f6f2e2] flex items-center justify-center mb-10 transition-transform hover:scale-110 duration-300">
                <Star className="w-7 h-7 text-[#735c00]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1b1d0e] mb-6">Our Mission</h3>
              <p className="text-[#4d4635] leading-relaxed text-lg font-light">
                To redefine the e-commerce grocery experience by blending age-old sourcing traditions with contemporary editorial aesthetics, ensuring every customer feels like a curated guest.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white rounded-[48px] p-10 md:p-14 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] border border-[#f0eee4] flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-full bg-[#f6f2e2] flex items-center justify-center mb-10 transition-transform hover:scale-110 duration-300">
                <Eye className="w-7 h-7 text-[#735c00]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1b1d0e] mb-6">Our Vision</h3>
              <p className="text-[#4d4635] leading-relaxed text-lg font-light">
                To become the global standard for luxury wellness, where dry fruits are celebrated not just as food, but as artisanal products that nourish the body and the spirit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Arabic Section */}
      <WhyArabic />

      {/* The Distinction Section */}
      <section className="w-full max-w-[1280px] px-4 md:px-8 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[#1b1d0e] text-4xl md:text-5xl font-medium mb-6">The Distinction</h2>
          <div className="w-24 h-px bg-[#d0c5af] mx-auto opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              icon: Leaf,
              title: "Organic\nSelection",
              desc: "Sourced from certified organic orchards that respect natural growth cycles."
            },
            {
              icon: ShieldCheck,
              title: "Quality\nSeal",
              desc: "Each batch undergoes three stages of rigorous hand-inspection for size and flavor."
            },
            {
              icon: Recycle,
              title: "Eco-\nPackaging",
              desc: "Reusable-minded glass and biodegradable materials to preserve freshness and the earth."
            },
            {
              icon: ShieldPlus,
              title: "Pure\nHygiene",
              desc: "Processed in temperature-controlled, ultra-sanitized environments for safety."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border border-[#f0eee4] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 flex flex-col items-start"
            >
              <item.icon className="w-6 h-6 text-[#735c00] mb-8" strokeWidth={1.5} />
              <h3 className="text-[#1b1d0e] text-xl font-bold mb-4 whitespace-pre-line leading-tight">{item.title}</h3>
              <p className="text-[#4d4635] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full max-w-[1000px] px-4 md:px-8 py-16 md:py-24 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-[60px] text-[#1b1d0e] font-serif leading-tight md:leading-[1.2] mb-16 px-4">
            "Our promise is simple: the earth's most exquisite flavors, delivered with uncompromising elegance."
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <Link 
              href="/shop" 
              className="bg-[#496506] hover:bg-[#3a5204] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore the Collection
            </Link>
            <Link 
              href="/about" 
              className="text-[#735c00] font-bold text-sm tracking-[0.15em] uppercase pb-1 border-b-2 border-[#735c00]/30 hover:border-[#735c00] transition-colors"
            >
              VIEW OUR HERITAGE
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
