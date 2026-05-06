"use client";
import { Menu, Search, User, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AuthModal } from './AuthModal';

export function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 flex justify-end">
          <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
            <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </button>
            
            {session ? (
              <Link 
                href="/profile"
                className="flex items-center gap-2 md:gap-3 h-10 md:h-12 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full pl-4 pr-1.5 md:pl-5 md:pr-2 lg:pl-6 lg:pr-2 transition-all group"
              >
                <span className="text-sm md:text-base font-medium text-gray-800 whitespace-nowrap hidden sm:block group-hover:text-[#496506] transition-colors">
                  Hi, <span className="font-bold capitalize">{session.user?.name ? session.user.name.split(' ')[0] : 'User'}</span>
                </span>
                <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-[#496506]/20 group-hover:bg-[#496506]/30 rounded-full overflow-hidden shrink-0 transition-colors">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#496506]" />
                  )}
                </div>
              </Link>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all"
              >
                <User className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
              </button>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6 text-gray-900" /> : <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl animate-in fade-in duration-300 pointer-events-auto flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Home</Link>
            <Link href="/#collections" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Collections</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Shop</Link>
            {session && (
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">My Profile</Link>
            )}
            <Link href="/#best-sellers" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Best Sellers</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">About Us</Link>
            {session ? (
              <button 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="text-3xl font-light text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
              >
                Logout <LogOut className="w-6 h-6" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-3xl font-light text-[#496506] hover:text-[#3a5005] transition-colors"
              >
                Login / Register
              </button>
            )}
          </nav>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}