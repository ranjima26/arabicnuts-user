"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import imgArabicNutsLogoPng3 from "figma:asset/0a072b9885ca84a574ec1ed74c34c0098abc5ff1.png";
import imgObject from "figma:asset/4e138d87f88df0007c9807655df9185a27fcb39e.png";
import imgObject1 from "figma:asset/4e092aad07eae5043c54b22342da629da2582b12.png";
import imgObject2 from "figma:asset/aac24150bf0e4fe83a245fc50f804619dbda80f7.png";
import imgObject3 from "figma:asset/c344b3da9eeb6df01d966269130958792e0fb116.png";

const floatingAnimation = {
  y: ["-15px", "15px", "-15px"],
};

const floatingAnimationReverse = {
  y: ["15px", "-15px", "15px"],
};

const floatingNuts = [
  {
    src: imgObject,
    className: "w-16 md:w-20 top-[15%] left-[20%] rotate-[60deg]",
    delay: 0,
  },
  {
    src: imgObject2,
    className: "w-20 md:w-24 top-[20%] right-[15%] -rotate-[30deg]",
    delay: 1,
  },
  {
    src: imgObject,
    className: "w-12 md:w-16 bottom-[25%] left-[25%] rotate-[45deg]",
    delay: 2,
  },
  {
    src: imgObject2,
    className: "w-16 md:w-24 bottom-[20%] right-[30%] rotate-[120deg]",
    delay: 1.5,
  },
  {
    src: imgObject,
    className: "w-14 md:w-20 top-[45%] left-[30%] rotate-[15deg]",
    delay: 0.5,
  },
  {
    src: imgObject2,
    className: "w-14 md:w-24 top-[50%] right-[35%] -rotate-[45deg]",
    delay: 2.5,
  },
];

const features = [
  {
    title: "100% Premium Quality",
    description:
      "Handpicked export-grade nuts selected for size, taste, and purity.",
    desktopPos: "top-[25%] right-[52%]",
    align: "right",
  },
  {
    title: "Freshly Packed Daily",
    description:
      "Sealed immediately after roasting to lock in aroma and crunch.",
    desktopPos: "top-[40%] left-[52%]",
    align: "left",
  },
  {
    title: "No Preservatives",
    description:
      "Only natural ingredients. No additives. No artificial flavoring.",
    desktopPos: "top-[55%] right-[52%]",
    align: "right",
  },
  {
    title: "Hygienic Storage",
    description:
      "Stored in climate-controlled facilities for maximum freshness.",
    desktopPos: "top-[70%] left-[52%]",
    align: "left",
  },
];

export function WhyArabic() {
  return (
    <section className="relative w-full min-h-[900px] lg:h-[1000px] bg-[#fafafa] overflow-hidden py-20 flex items-center justify-center font-['Roboto',sans-serif]">

      {/* Background Palm Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <Image
            src={imgArabicNutsLogoPng3}
            alt="Palm tree background"
            width={800}
            height={800}
            priority
            className="w-[90%] md:w-[70%] lg:w-[800px] h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Decorative Left Bowl */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute left-[-20%] md:left-[-15%] lg:left-[-5%] top-1/2 -translate-y-1/2 z-10 w-[250px] md:w-[350px] lg:w-[500px] drop-shadow-2xl pointer-events-none"
      >
        <Image
          src={imgObject3}
          alt="Bowl of nuts"
          width={500}
          height={500}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Decorative Right Bowl */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute right-[-15%] md:right-[-10%] lg:right-[-5%] top-[60%] -translate-y-1/2 z-10 w-[220px] md:w-[300px] lg:w-[450px] drop-shadow-2xl pointer-events-none"
      >
        <Image
          src={imgObject1}
          alt="Bowl of nuts"
          width={450}
          height={450}
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Floating Nuts */}
      {floatingNuts.map((nut, index) => (
        <motion.div
          key={index}
          className={`absolute z-10 drop-shadow-xl pointer-events-none ${nut.className}`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={
            index % 2 === 0
              ? floatingAnimation
              : floatingAnimationReverse
          }
          transition={{
            duration: index % 2 === 0 ? 5 : 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: nut.delay,
          }}
          viewport={{ once: true }}
        >
          <Image
            src={nut.src}
            alt="Floating Nut"
            width={120}
            height={120}
            className="w-full h-auto object-contain"
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative h-full flex flex-col items-center">

        {/* Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:absolute lg:top-[5%] lg:left-1/2 lg:-translate-x-1/2 lg:mb-0 lg:w-full"
        >
          <h2 className="text-2xl md:text-3xl lg:text-[40px] text-[#65615e] font-light uppercase tracking-widest lg:leading-[50px]">
            Why Arabic
          </h2>

          <h3 className="text-4xl md:text-5xl lg:text-[70px] text-[#65615e] font-medium uppercase tracking-wider lg:leading-[60px] mt-1 lg:mt-2">
            Dry Fruits
          </h3>
        </motion.div>

        {/* Desktop Features */}
        <div className="hidden lg:block absolute inset-0 w-full h-full mt-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              viewport={{ once: true }}
              className={`absolute ${feature.desktopPos} flex items-center gap-6 ${
                feature.align === "left"
                  ? "flex-row-reverse"
                  : "flex-row"
              } w-max max-w-[450px] xl:max-w-[500px] group justify-end`}
            >
              <p
                className={`text-[#373737] text-[15px] leading-[20px] w-[180px] xl:w-[280px] ${
                  feature.align === "left"
                    ? "text-left"
                    : "text-right"
                } transition-colors duration-300 group-hover:text-black`}
              >
                {feature.description}
              </p>

              <div className="bg-white/90 backdrop-blur-sm h-[85px] w-[306px] rounded-[25px] shadow-[0px_0px_15px_rgba(0,0,0,0.08)] flex items-center px-8 border border-white/50 hover:shadow-[0px_0px_20px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300">
                <span className="text-[#496506] text-[22px] font-semibold leading-[24px]">
                  {feature.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Features */}
        <div className="lg:hidden flex flex-col gap-8 w-full max-w-md mx-auto relative z-30 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg">
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