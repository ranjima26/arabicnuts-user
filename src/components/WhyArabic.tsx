"use client";
import { motion } from 'motion/react';
import imgArabicNutsLogoPng3 from "@/assets/0a072b9885ca84a574ec1ed74c34c0098abc5ff1.png";
import imgObject from "@/assets/4e138d87f88df0007c9807655df9185a27fcb39e.png";
import imgObject1 from "@/assets/4e092aad07eae5043c54b22342da629da2582b12.png";
import imgObject2 from "@/assets/aac24150bf0e4fe83a245fc50f804619dbda80f7.png";
import imgObject3 from "@/assets/c344b3da9eeb6df01d966269130958792e0fb116.png";

const floatingAnimation = {
  y: [-15, 15, -15],
};

const floatingAnimationReverse = {
  y: [15, -15, 15],
};

const floatingNuts = [
  { src: imgObject.src, className: "w-16 md:w-20 top-[15%] left-[20%] rotate-[60deg]", delay: 0 },
  { src: imgObject2.src, className: "w-20 md:w-24 top-[20%] right-[15%] -rotate-[30deg]", delay: 1 },
  { src: imgObject.src, className: "w-12 md:w-16 bottom-[25%] left-[25%] rotate-[45deg]", delay: 2 },
  { src: imgObject2.src, className: "w-16 md:w-24 bottom-[20%] right-[30%] rotate-[120deg]", delay: 1.5 },
  { src: imgObject.src, className: "w-14 md:w-20 top-[45%] left-[30%] rotate-[15deg]", delay: 0.5 },
  { src: imgObject2.src, className: "w-14 md:w-24 top-[50%] right-[35%] -rotate-[45deg]", delay: 2.5 },
];

const features = [
  {
    title: "100% Premium Quality",
    description: "Handpicked Export-Grade Nuts Selected For Size, Taste, And Purity.",
    pillPosition: "left"
  },
  {
    title: "Freshly Packed Daily",
    description: "Sealed Immediately After Roasting To Lock In Aroma And Crunch.",
    pillPosition: "right"
  },
  {
    title: "No Preservatives",
    description: "Only Natural Ingredients. No Additives. No Artificial Flavoring.",
    pillPosition: "left"
  },
  {
    title: "Hygienic Storage",
    description: "Stored In Climate-Controlled Facilities For Maximum Freshness.",
    pillPosition: "right"
  }
];

export function WhyArabic() {
  return (
    <section className="relative w-full min-h-[900px] lg:h-[1000px] bg-[#fafafa] overflow-hidden py-20 flex items-center justify-center font-['Roboto',sans-serif]">

      {/* Background Palm Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          src={imgArabicNutsLogoPng3.src}
          alt="Palm tree background"
          className="w-[90%] md:w-[70%] lg:w-[800px] object-contain"
        />
      </div>

      {/* Decorative Left Bowl */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -left-[40%] md:-left-[20%] lg:-left-[150px] top-[35%] lg:top-[40%] -translate-y-1/2 z-10 w-[300px] md:w-[400px] lg:w-[500px] drop-shadow-2xl pointer-events-none"
      >
        <img src={imgObject3.src} alt="Bowl of nuts" className="w-full h-auto -rotate-[54deg]" />
      </motion.div>

      {/* Decorative Right Bowl */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute -right-[30%] md:-right-[15%] lg:-right-[150px] top-[60%] lg:top-[65%] -translate-y-1/2 z-10 w-[280px] md:w-[380px] lg:w-[480px] drop-shadow-2xl pointer-events-none"
      >
        <img src={imgObject1.src} alt="Bowl of nuts" className="w-full h-auto" />
      </motion.div>

      {/* Floating Individual Nuts */}
      {floatingNuts.map((nut, index) => (
        <motion.img
          key={index}
          src={nut.src}
          alt=""
          className={`absolute z-10 drop-shadow-xl pointer-events-none ${nut.className}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={index % 2 === 0 ? floatingAnimation : floatingAnimationReverse}
          transition={{ 
            y: {
              duration: index % 2 === 0 ? 5 : 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: nut.delay
            },
            opacity: { duration: 0.6, delay: nut.delay * 0.2 },
            scale: { duration: 0.6, delay: nut.delay * 0.2 }
          }}
          viewport={{ once: true }}
        />
      ))}

      {/* Content Container */}
      <div className="container mx-auto px-4 z-20 relative h-full flex flex-col items-center">

        {/* Title (Mobile & Desktop) */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:absolute lg:top-[5%] lg:left-1/2 lg:-translate-x-1/2 lg:mb-0 lg:w-full"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] text-[#868381] font-light uppercase tracking-widest lg:leading-[50px]">
            Why Arabic
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-[70px] text-[#65615e] font-medium uppercase tracking-wider lg:leading-[60px] mt-1 lg:mt-2">
            Dry Fruits
          </h3>
        </motion.div>

        {/* Desktop & Tablet Alternating Layout */}
        <div className="hidden md:flex flex-col gap-16 lg:gap-20 w-full max-w-4xl mx-auto relative z-30 mt-12 lg:mt-48">
          {features.map((feature, idx) => {
            const isPillLeft = feature.pillPosition === 'left';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-8 lg:gap-12 items-center w-full"
              >
                {/* Left Column */}
                <div className={`flex w-full ${isPillLeft ? 'justify-end' : 'justify-end'}`}>
                  {isPillLeft ? (
                    <div className="bg-gradient-to-r from-white/20 to-white/95 backdrop-blur-sm h-[70px] md:h-[80px] w-full max-w-[300px] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 flex items-center justify-center px-6 hover:scale-105 transition-transform duration-300">
                      <span className="text-[#516b08] text-base md:text-lg lg:text-xl font-bold">
                        {feature.title}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[#65615e] text-sm md:text-[15px] font-medium leading-relaxed text-right max-w-[280px]">
                      {feature.description}
                    </p>
                  )}
                </div>

                {/* Right Column */}
                <div className={`flex w-full ${isPillLeft ? 'justify-start' : 'justify-start'}`}>
                  {!isPillLeft ? (
                    <div className="bg-gradient-to-l from-white/20 to-white/95 backdrop-blur-sm h-[70px] md:h-[80px] w-full max-w-[300px] rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 flex items-center justify-center px-6 hover:scale-105 transition-transform duration-300">
                      <span className="text-[#516b08] text-base md:text-lg lg:text-xl font-bold">
                        {feature.title}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[#65615e] text-sm md:text-[15px] font-medium leading-relaxed text-left max-w-[280px]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Flex Layout */}
        <div className="md:hidden flex flex-col gap-8 w-full max-w-md mx-auto relative z-30 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-2"
            >
              <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-white">
                <h4 className="text-[#496506] text-xl font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-[#373737] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
