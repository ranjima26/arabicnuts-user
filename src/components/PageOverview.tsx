"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Leaf, 
  Truck, 
  Minus, 
  Plus, 
  ChevronRight, 
  Heart,
  BadgeCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart, setBuyNowItem } from "@/redux/slices/cartSlice";
import imgJar from "@/assets/0d50403659dbeb714860454d0322380314619c03.png";

// Mock data for demonstration - you can replace this with real props
const MOCK_PRODUCT = {
  id: "p1",
  name: "Premium Royal Dates",
  subtitle: "Hand-picked from the finest farms in Medina",
  price: "₹1,299",
  oldPrice: "₹1,599",
  discount: "19% OFF",
  rating: 4.8,
  reviews: 124,
  description: "Experience the ultimate luxury with our Premium Royal Dates. Naturally sweet, incredibly soft, and packed with essential nutrients. Perfect for gifting or daily healthy snacking.",
  images: [imgJar.src, imgJar.src, imgJar.src, imgJar.src], // Use actual varied images here
  features: [
    "100% Natural & Organic",
    "No Added Sugar",
    "Rich in Fiber & Potassium",
    "Premium Vacuum Packaging"
  ]
};

export function PageOverview({ product = MOCK_PRODUCT }: { product?: any }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState("description");

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    // Parse price string like "₹1,299" to number 1299
    const priceValue = typeof product.price === 'string' 
      ? Number(product.price.replace(/[^\d]/g, '')) 
      : product.price;

    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      image: mainImage,
      price: priceValue,
      qty: quantity
    }));
    
    router.push("/cart");
  };

  const handleBuyNow = () => {
    // Parse price string like "₹1,299" to number 1299
    const priceValue = typeof product.price === 'string' 
      ? Number(product.price.replace(/[^\d]/g, '')) 
      : product.price;

    dispatch(setBuyNowItem({
      _id: product.id,
      name: product.name,
      image: mainImage,
      price: priceValue,
      qty: quantity
    }));
    
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-[#fcfcfb] min-h-screen py-8 md:py-16 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
          <Link href="/" className="hover:text-[#496506] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-[#496506] transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1b1d0e] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Main Image */}
            <div className="relative aspect-square w-full bg-gradient-to-br from-[#f4ebd0]/30 to-[#f4ebd0]/10 rounded-[32px] border border-[#d0c5af]/20 overflow-hidden flex items-center justify-center p-12 group">
              {product.discount && (
                <div className="absolute top-6 left-6 z-10 bg-[#e7000b] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg tracking-wider">
                  {product.discount}
                </div>
              )}
              <button className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur p-3 rounded-full text-gray-400 hover:text-[#e7000b] hover:bg-white transition-all shadow-sm">
                <Heart className="w-5 h-5" />
              </button>
              
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl border-2 overflow-hidden bg-white p-2 transition-all duration-300 ${
                    mainImage === img ? 'border-[#496506] shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] mb-3">{product.name}</h1>
              <p className="text-[#735c00] text-lg font-medium">{product.subtitle}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center text-[#eab308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{product.rating}</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#496506] hover:underline cursor-pointer text-sm font-medium">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-[#496506]">{product.price}</span>
              <span className="text-xl text-gray-400 line-through font-medium">{product.oldPrice}</span>
              <span className="text-sm font-bold text-[#e7000b] bg-[#e7000b]/10 px-3 py-1 rounded-full">Save {product.discount}</span>
            </div>

            <p className="text-gray-600 leading-relaxed font-light mb-8">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-10 w-full">
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl h-14 px-2 sm:px-4 w-[120px] sm:w-40 shrink-0 shadow-sm">
                <button onClick={decrement} className="text-gray-400 hover:text-[#496506] transition-colors p-2">
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="font-bold text-base sm:text-lg w-8 sm:w-10 text-center text-[#1b1d0e]">{quantity}</span>
                <button onClick={increment} className="text-gray-400 hover:text-[#496506] transition-colors p-2">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 w-full flex items-center justify-center gap-2 bg-[#496506] hover:bg-[#3a5204] text-white h-14 rounded-xl font-bold text-[13px] sm:text-base tracking-widest uppercase transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
            </div>

            {/* Buy Now Button */}
            <button 
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 bg-[#1b1d0e] hover:bg-black text-white h-14 rounded-xl font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg mb-10"
            >
              Buy it Now
            </button>

            {/* Key Features/Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-[#f4ebd0]/30 p-4 rounded-2xl border border-[#d0c5af]/20">
                <div className="bg-white p-2 rounded-xl text-[#735c00] shadow-sm"><Leaf className="w-5 h-5" /></div>
                <span className="font-semibold text-sm text-[#1b1d0e]">100% Organic</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f4ebd0]/30 p-4 rounded-2xl border border-[#d0c5af]/20">
                <div className="bg-white p-2 rounded-xl text-[#735c00] shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                <span className="font-semibold text-sm text-[#1b1d0e]">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f4ebd0]/30 p-4 rounded-2xl border border-[#d0c5af]/20">
                <div className="bg-white p-2 rounded-xl text-[#735c00] shadow-sm"><Truck className="w-5 h-5" /></div>
                <span className="font-semibold text-sm text-[#1b1d0e]">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f4ebd0]/30 p-4 rounded-2xl border border-[#d0c5af]/20">
                <div className="bg-white p-2 rounded-xl text-[#735c00] shadow-sm"><BadgeCheck className="w-5 h-5" /></div>
                <span className="font-semibold text-sm text-[#1b1d0e]">100% Authentic</span>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
                {['description', 'ingredients', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                      activeTab === tab ? 'text-[#496506]' : 'text-gray-400 hover:text-gray-800'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#496506] rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[150px] text-gray-600 font-light leading-relaxed">
                {activeTab === 'description' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p>Our Royal Dates are cultivated in optimal climates, carefully harvested at peak ripeness, and naturally dried to preserve their exquisite caramel-like flavor and soft, melt-in-your-mouth texture.</p>
                    <ul className="list-disc pl-5 space-y-2 text-[#496506]">
                      {product.features.map((f: string, i: number) => (
                        <li key={i}><span className="text-gray-600">{f}</span></li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {activeTab === 'ingredients' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>100% Pure Natural Dates. No preservatives, artificial colors, or added sugars. Packed in a facility that also processes tree nuts.</p>
                  </motion.div>
                )}
                {activeTab === 'shipping' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>Free standard shipping on orders over ₹1,500. Express delivery available at checkout. All orders are packed in climate-controlled environments to ensure maximum freshness upon arrival.</p>
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Benefits Section */}
        <div className="mt-24 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b1d0e] mb-12">Benefits</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Diabetic friendly", icon: <Leaf className="w-8 h-8 text-white stroke-[1.5]" /> },
              { title: "Potassium packed", icon: <Leaf className="w-8 h-8 text-white stroke-[1.5]" /> },
              { title: "Digestive boost", icon: <Leaf className="w-8 h-8 text-white stroke-[1.5]" /> },
              { title: "Vitamin K rich", icon: <Leaf className="w-8 h-8 text-white stroke-[1.5]" /> },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#f8f9fa] rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#496506] to-[#f97316] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                  {benefit.icon}
                </div>
                <h3 className="text-[#1b1d0e] font-medium text-lg">{benefit.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
