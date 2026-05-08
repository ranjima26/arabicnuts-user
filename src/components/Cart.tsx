"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearBuyNowItem } from '@/redux/slices/cartSlice';
import jarImage from '@/assets/0d50403659dbeb714860454d0322380314619c03.png';

export function Cart() {
  const dispatch = useDispatch();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { cartItems: items } = useSelector((state: any) => state.cart);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Clear any buy now item when viewing the full cart
    dispatch(clearBuyNowItem());
  }, [dispatch]);

  if (!isMounted) return null;

  const subtotal = items.reduce((acc: any, item: any) => {
    const rawPrice = typeof item.price === 'string' 
      ? item.price.replace(/[^\d]/g, '') 
      : String(item.price);
    const price = Number(rawPrice) || 0;
    const qty = Number(item.qty || item.quantity) || 1;
    return acc + (price * qty);
  }, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const updateQuantity = (item: any, delta: number) => {
    const newQty = Math.max(1, item.qty + delta);
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(clearBuyNowItem());
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 flex items-center justify-center">
        <div className="text-gray-400 animate-pulse font-light">Loading your bag...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl text-gray-700 mb-2 font-bold font-['Roboto',sans-serif]">Your Bag</h1>
              <p className="text-gray-500 font-light">
                {items.length === 0 ? "Your bag is currently empty" : `You have ${items.length} items in your bag`}
              </p>
            </div>
            <Link 
              href="/shop"
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-[#496506] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-light">Continue Shopping</span>
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-8">
                <AnimatePresence mode="popLayout">
                  {items.map((item: any) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="relative w-full sm:w-40 h-40 bg-gray-50 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" 
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-between py-2">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-medium text-gray-900">
                              {item.name} {item.variant?.size ? `(${item.variant.size})` : ''}
                            </h3>
                            <button 
                              onClick={() => removeItem(item._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">{item.category || 'Nuts'}</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item, -1)}
                              className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.qty}</span>
                            <button 
                              onClick={() => updateQuantity(item, 1)}
                              className="text-gray-500 hover:text-gray-900 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">₹{Number(item.price * item.qty).toLocaleString()}</p>
                            {item.qty > 1 && (
                              <p className="text-xs text-gray-400 font-light">₹{item.price.toLocaleString()} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="font-medium text-gray-500">Subtotal</span>
                      <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-500">Shipping estimate</span>
                        <HelpCircle className="w-4 h-4 text-gray-300" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] leading-tight font-bold text-[#496506] uppercase tracking-wider">Calculated at<br/>checkout</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-500">Tax estimate</span>
                        <HelpCircle className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="font-bold text-gray-900">₹0.00</span>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">Order total</span>
                      <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <button 
                      onClick={handleCheckout}
                      className="w-full py-4 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] text-white rounded-lg transition-all duration-300 font-bold text-lg mb-6 shadow-lg shadow-[#496506]/20 hover:shadow-2xl hover:shadow-[#496506]/40 hover:-translate-y-1 active:scale-[0.98]"
                    >
                      Checkout
                    </button>
                  </Link>

                  <div className="text-center">
                    <Link href="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1">
                      <span className="font-light">or</span> <span className="font-bold">Continue Shopping</span> <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Your bag is empty</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto font-light">
                Looks like you haven't added anything to your bag yet. 
                Discover our premium collection of nuts and dried fruits.
              </p>
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#496506] text-white rounded-2xl hover:bg-[#3a5205] transition-all font-medium"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
