"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { addToCart, setBuyNowItem } from "@/redux/slices/cartSlice";
import imgPistachio from "@/assets/roasted_pistachios.png";
import imgMedjool from "@/assets/medjool_dates.png";
import { useEffect } from "react";
import { useGetProductDetailsQuery } from "@/redux/api/productApi";
import { products } from "@/data/products";
// Mock data for demonstration - you can replace this with real props
const MOCK_PRODUCT = {
  id: "p2",
  name: "Premium Roasted Pistachios",
  subtitle: "Lightly Salted & Perfectly Roasted Saudi Arabian Pistachios",
  price: "₹899",
  oldPrice: "₹1,199",
  discount: "25% OFF",
  rating: 4.9,
  reviews: 218,
  description: "Savor the crunch of our Premium Roasted Pistachios. Lightly salted to perfection and roasted in small batches to ensure maximum freshness and flavor. A powerhouse of protein and healthy fats, these are the ultimate guilt-free snack.",
  images: [imgPistachio.src, imgPistachio.src, imgPistachio.src, imgPistachio.src],
  features: [
    "Freshly Roasted in Small Batches",
    "Lightly Salted (Low Sodium)",
    "High Protein & Healthy Fats",
    "100% Natural & Gluten-Free"
  ],
  ingredients: "Premium Quality Pistachios, Minimal Sea Salt.",
  benefits: [
    { title: "Heart Healthy", icon: null },
    { title: "Weight Management", icon: null },
    { title: "Antioxidant Rich", icon: null },
    { title: "Energy Booster", icon: null }
  ]
};

const DEFAULT_BENEFITS = [
  { title: "100% Organic", icon: null },
  { title: "Premium Quality", icon: null },
  { title: "Ethically Sourced", icon: null },
  { title: "No Preservatives", icon: null }
];

export function PageOverview({ productId }: { productId?: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: response, isLoading } = useGetProductDetailsQuery(productId, { skip: !productId });
  const fetchedProduct = response;

  // Find in local products if not in DB (for mock data support)
  const localProduct = products.find(p => p.id === productId || p._id === productId);

  const product = fetchedProduct || localProduct || MOCK_PRODUCT;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIdx] || null;
  const price = selectedVariant?.price || product.price || 0;
  const discountPrice = selectedVariant?.discountPrice || product.discountPrice || 0;

  const isMedjool = product.name?.toLowerCase().includes('medjool');
  const fallbackImg = isMedjool ? imgMedjool.src : imgPistachio.src;

  const displayImage = mainImage || (isMedjool ? imgMedjool.src : (product.mainImage || product.images?.[0]?.url || product.images?.[0] || fallbackImg));
  
  const allImages = isMedjool 
    ? [imgMedjool.src, imgMedjool.src, imgMedjool.src, imgMedjool.src] 
    : (product.images && typeof product.images[0] === 'string'
        ? product.images
        : [(product.mainImage), ...(product.images || []).map((img: any) => img.url)].filter(Boolean));
  if (allImages.length === 0) allImages.push(fallbackImg);

  if (!isMounted) return null;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to your cart", {
        description: "You need to be logged in to manage your bag.",
        action: {
          label: "Login",
          onClick: () => router.push("/")
        }
      });
      return;
    }
    dispatch(addToCart({
      _id: product._id || product.id,
      name: product.name,
      image: displayImage,
      price: typeof price === 'string' ? Number(price.replace(/[^\d]/g, '')) : price,
      qty: quantity,
      variant: selectedVariant
    }));

    toast.success(`${quantity > 1 ? `${quantity}x ` : ""}${product.name} added to cart!`, {
      description: "Keep shopping or head to your cart.",
      action: {
        label: "Go to Cart",
        onClick: () => router.push("/cart")
      }
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout", {
        description: "You need to be logged in to make a purchase.",
        action: {
          label: "Login",
          onClick: () => router.push("/")
        }
      });
      return;
    }
    dispatch(setBuyNowItem({
      _id: product._id || product.id,
      name: product.name,
      image: displayImage,
      price: typeof price === 'string' ? Number(price.replace(/[^\d]/g, '')) : price,
      qty: quantity,
      variant: selectedVariant
    }));

    router.push("/checkout");
  };



  return (
    <div className="w-full bg-[#fcfcfb] min-h-screen py-8 md:py-16 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">


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
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl border-2 overflow-hidden bg-white p-2 transition-all duration-300 ${displayImage === img ? 'border-[#496506] shadow-md' : 'border-gray-100 opacity-70 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1b1d0e] mb-3">{product.name}</h1>
              <p className="text-[#735c00] text-lg font-medium">{product.shortDescription || product.subtitle}</p>
            </div>


            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center text-[#eab308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{product.averageRating || product.rating || 5}</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#496506] hover:underline cursor-pointer text-sm font-medium">{product.reviews?.length || 0} Reviews</span>
            </div>


            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-[#496506]">{price}</span>
              {discountPrice > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through font-medium">₹{discountPrice}</span>
                  <span className="text-sm font-bold text-[#e7000b] bg-[#e7000b]/10 px-3 py-1 rounded-full">Sale</span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed font-light mb-8">
              {product.description}
            </p>


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


            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 bg-[#1b1d0e] hover:bg-black text-white h-14 rounded-xl font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg mb-10"
            >
              Buy it Now
            </button>


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


            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-8 border-b border-gray-200 mb-6">
                {['description', 'ingredients', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === tab ? 'text-[#496506]' : 'text-gray-400 hover:text-gray-800'
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
                    <p>{product.description}</p>
                    <ul className="list-disc pl-5 space-y-2 text-[#496506]">
                      {(product.features?.length > 0 ? product.features : MOCK_PRODUCT.features).map((f: string, i: number) => (
                        <li key={i}><span className="text-gray-600">{f}</span></li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {activeTab === 'ingredients' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>{product.ingredients || "Ingredients information not available for this product."}</p>
                  </motion.div>
                )}
                {activeTab === 'shipping' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p>Free standard shipping on orders over ₹1,000. Express delivery available at checkout. All orders are packed in climate-controlled environments to ensure maximum freshness upon arrival.</p>
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        </div>


        <div className="mt-24 w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1b1d0e] mb-12">Benefits</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(product.benefits || MOCK_PRODUCT.benefits || DEFAULT_BENEFITS).map((benefit: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#f8f9fa] rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#496506] to-[#f97316] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                  {benefit.icon || <Leaf className="w-8 h-8 text-white stroke-[1.5]" />}
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
