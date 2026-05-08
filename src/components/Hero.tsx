"use client";
import { useEffect, useState } from "react";
import heroImage from "@/assets/07719174ecd19efeb79d22ddda1e5a4b50c21394.png";
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <section className="relative min-h-screen bg-[#fcfcfb]" id="home" />;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background Image Container with fixed responsive framing */}
      <div className="absolute inset-0">
        <div className="absolute inset-2 md:inset-4 lg:inset-6">
          <img 
            src={heroImage.src} 
            alt="Arabic Dry Fruits Store" 
            className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#496506]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D39B16]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Scroll to Products"
      >
        <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
      </button>
    </section>
  );
}