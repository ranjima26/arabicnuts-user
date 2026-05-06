import heroImage from "figma:asset/07719174ecd19efeb79d22ddda1e5a4b50c21394.png";
import logoFull from "figma:asset/4ad3b8a239befc4caeab434186a8daffd93b0422.png";
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full mx-2 my-2 md:mx-4 md:my-3 lg:mx-6 lg:my-4">
          <img 
            src={heroImage} 
            alt="Arabic Dry Fruits Store" 
            className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 rounded-2xl md:rounded-3xl" />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#496506]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D39B16]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mt-20">
        <div className="mb-6 md:mb-8 animate-fade-in">
          
        </div>
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light max-w-3xl mx-auto drop-shadow-lg mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Premium Quality Dry Fruits & Nuts
        </h1>
        <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Handpicked from the finest orchards, delivered fresh to your doorstep
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#collections" 
            className="bg-[#496506] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#3d5405] transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Shop Now
          </a>
          <a 
            href="#best-sellers" 
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
          >
            Explore More
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white drop-shadow-lg" />
      </div>
    </section>
  );
}