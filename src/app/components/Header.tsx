import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import logoIcon from "figma:asset/4ad3b8a239befc4caeab434186a8daffd93b0422.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Arabic Dry Fruits" className="h-10 lg:h-12 w-auto" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-[#496506]">Arabic Dry Fruits</h1>
              <p className="text-xs text-gray-600">Premium Quality</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            <a href="#home" className="hover:text-[#496506] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#496506] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#collections" className="hover:text-[#496506] transition-colors relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#496506] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#best-sellers" className="hover:text-[#496506] transition-colors relative group">
              Best Sellers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#496506] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#gift-hampers" className="hover:text-[#496506] transition-colors relative group">
              Gift Hampers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#496506] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="hover:text-[#496506] transition-colors relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#496506] group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button className="p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 relative">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#496506] text-white text-xs rounded-full flex items-center justify-center">0</span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-105 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3">
              <a href="#home" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">Home</a>
              <a href="#collections" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">Collections</a>
              <a href="#best-sellers" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">Best Sellers</a>
              <a href="#gift-hampers" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">Gift Hampers</a>
              <a href="#wholesale" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">Wholesale</a>
              <a href="#about" className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 font-medium">About Us</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}