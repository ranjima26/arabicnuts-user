"use client";
import { motion } from "framer-motion";
import imgBgLogo from "@/assets/0a072b9885ca84a574ec1ed74c34c0098abc5ff1.png";
import imgDates from "../assets/Container.png";
import imgAlmonds from "../assets/Margin.png";
import imgPistachios from "../assets/Margin-1.png";
import imgCashews from "../assets/Margin-2.png";
import imgFigs from "../assets/Margin-3.png";
import imgChocolates from "../assets/Margin-4.png";
import imgSpices from "../assets/Margin-5.png";
import imgJar from "@/assets/0d50403659dbeb714860454d0322380314619c03.png";
import { ShoppingCart, Tag, ShieldCheck, Leaf, PackageCheck, ThermometerSnowflake } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";

import { products } from "@/data/products";

const bentoItems = [
  { name: "Almonds", img: imgAlmonds },
  { name: "Pistachios", img: imgPistachios },
  { name: "Cashews", img: imgCashews },
  { name: "Figs", img: imgFigs },
  { name: "Chocolates", img: imgChocolates },
  { name: "Spices", img: imgSpices },
];

const bestsellers = products;

export function ShopPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (product: any, id: number) => {
    const priceValue = typeof product.price === 'string' 
      ? Number(product.price.replace(/[^\d]/g, '')) 
      : product.price;

    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      image: product.images[0],
      price: priceValue,
      qty: 1
    }));
    
    router.push("/cart");
  };

  if (!isMounted) return null;

  return (
    <div id="shop" className="w-full bg-[#fcfcfb] flex flex-col items-center pb-24 overflow-x-hidden">

      {/* Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0 flex justify-center opacity-10">
        <img
          src={imgBgLogo?.src}
          alt="Watermark"
          className="w-full max-w-[800px] object-cover object-top"
          style={{ transform: 'translateY(-20%) scale(1.5)' }}
        />
      </div>

      <div className="w-full max-w-[1280px] px-4 md:px-8 relative z-10 flex flex-col gap-12 lg:gap-20">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 md:mt-24"
        >
          <h2 className="text-[#65615e] font-light text-2xl md:text-[40px] uppercase tracking-wider mb-2">Shop</h2>
          <h1 className="text-[#65615e] font-medium text-4xl md:text-[70px] leading-tight uppercase mb-6">Premium Collection</h1>
          <p className="text-[#5e604d] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Experience the heritage of the Orient through our meticulously sourced, hand-picked selection of the world's finest dry fruits and delicacies.
          </p>
        </motion.div>

        {/* Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#496506] rounded-xl flex flex-col md:flex-row items-center justify-between p-6 md:px-10 md:py-6 shadow-lg gap-4"
        >
          <div className="flex items-center gap-3 text-white">
            <Tag className="w-6 h-6 md:w-8 md:h-8 rotate-90 text-[#f5f5dc]" />
            <span className="font-bold text-base md:text-lg tracking-widest uppercase">15% OFF Your First Order</span>
          </div>
          <button className="bg-white text-[#496506] px-6 py-3 rounded-lg font-bold text-sm tracking-wider uppercase hover:bg-[#f5f5dc] transition-colors whitespace-nowrap">
            Apply Code: MARHABA
          </button>
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
          <Link href="/product/premium-dates" className="lg:col-span-1 lg:row-span-2 bg-[#f4ebd0]/30 backdrop-blur-sm rounded-[24px] overflow-hidden border border-[#d0c5af]/20 p-6 md:p-8 flex flex-col relative min-h-[300px] lg:min-h-full group hover:shadow-xl transition-all cursor-pointer">
            <div className="z-10 relative">
              <p className="text-[#735c00] font-bold text-xs uppercase tracking-widest mb-2">Signature</p>
              <h3 className="text-[#1b1d0e] font-bold text-3xl">Premium Dates</h3>
            </div>
            <div className="absolute -bottom-9 -right-9 w-[265px] h-[265px] md:w-[310px] md:h-[310px] group-hover:scale-105 transition-transform duration-500">
              <img src={imgDates.src} alt="Premium Dates" className="w-full h-full object-contain rotate-[10deg] drop-shadow-xl" />
            </div>
          </Link>

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

        {/* Bestsellers */}
        <div className="flex flex-col gap-8 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1"
          >
            <p className="text-[#735c00] font-bold text-sm uppercase tracking-widest">Curated Selection</p>
            <h2 className="text-[#1b1d0e] font-bold text-3xl md:text-4xl">Bestsellers</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {bestsellers.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#f8faeb] rounded-[24px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow group flex flex-col border border-[#e6eed4]"
              >
                {/* Product Image */}
                <Link href={`/product/${item.id}`} className="relative h-[250px] w-full bg-gradient-to-br from-[#f4ebd0]/30 to-[#f4ebd0]/10 overflow-hidden flex items-center justify-center p-8">
                  {item.discount && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#fb2c36] to-[#e7000b] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {item.discount}
                    </div>
                  )}
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl" />
                </Link>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#eab308]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-xs ml-1 font-medium">({item.rating})</span>
                  </div>

                  <Link href={`/product/${item.id}`} className="block w-fit">
                    <h4 className="text-xl font-bold text-[#373737] mb-1 hover:text-[#496506] transition-colors">{item.name}</h4>
                  </Link>
                  <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-[#496506] font-bold text-2xl leading-none">{item.price}</span>
                      <span className="text-gray-400 text-sm line-through font-medium">{item.oldPrice}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(item, idx)}
                      className="bg-[#496506] hover:bg-[#3a5204] text-white p-3 rounded-full transition-colors group-hover:-translate-y-1"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#f4ebd0]/50 backdrop-blur-sm rounded-[32px] p-8 md:p-12 border border-[#d0c5af]/30 grid grid-cols-2 md:grid-cols-4 gap-8 my-8"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <Leaf className="w-8 h-8 text-[#735c00] stroke-[1.5]" />
            <div>
              <h4 className="font-bold text-[#1b1d0e] text-sm uppercase tracking-wider mb-1">100% Natural</h4>
              <p className="text-[#5e604d] text-xs">Direct from local farms</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#735c00] stroke-[1.5]" />
            <div>
              <h4 className="font-bold text-[#1b1d0e] text-sm uppercase tracking-wider mb-1">No Preservatives</h4>
              <p className="text-[#5e604d] text-xs">Pure, authentic goodness</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <PackageCheck className="w-8 h-8 text-[#735c00] stroke-[1.5]" />
            <div>
              <h4 className="font-bold text-[#1b1d0e] text-sm uppercase tracking-wider mb-1">Fresh Packed</h4>
              <p className="text-[#5e604d] text-xs">Vacuum-sealed for longevity</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <ThermometerSnowflake className="w-8 h-8 text-[#735c00] stroke-[1.5]" />
            <div>
              <h4 className="font-bold text-[#1b1d0e] text-sm uppercase tracking-wider mb-1">Hygienic Storage</h4>
              <p className="text-[#5e604d] text-xs">Controlled environment</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
