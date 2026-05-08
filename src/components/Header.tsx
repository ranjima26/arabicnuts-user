"use client";
import { Menu, Search, User, X, LogOut, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { AuthModal } from './AuthModal';
import { products } from '@/data/products';

export function Header() {
  const { data: session } = useSession();
  const { cartItems } = useSelector((state: any) => state.cart);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartItemCount = cartItems.reduce((acc: number, item: any) => acc + (item.qty || 0), 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  
  useEffect(() => {
    if (searchQuery.trim().length < 1) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    );
    setSearchResults(matched);
  }, [searchQuery]);

  const handleSearchSelect = (productId: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0].id);
    }
  };

  if (!isMounted) return (
    <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 flex justify-end">
        <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 backdrop-blur-md border border-white/20 rounded-full" />
        </div>
      </div>
    </header>
  );

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 flex justify-end">
          <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </button>
            
            <Link 
              href="/cart"
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all relative"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#496506] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                  {cartItemCount}
                </span>
              )}
            </Link>

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

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSearchOpen(false);
              setSearchQuery('');
              setSearchResults([]);
            }
          }}
        >
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-[#496506] shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products (e.g. Dates, Almonds...)"
                className="flex-1 text-base text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-700 transition-colors" />
              </button>
            </form>

            {/* Results */}
            {searchQuery.trim().length > 0 && (
              <div className="max-h-[320px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchSelect(product.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#f4ebd0]/40 transition-colors text-left border-b border-gray-50 last:border-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-contain rounded-xl bg-gray-50 p-1 shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[#1b1d0e] text-sm truncate">{product.name}</span>
                        <span className="text-xs text-gray-500 truncate">{product.subtitle}</span>
                        <span className="text-sm font-bold text-[#496506] mt-1">{product.price}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-8 text-center text-gray-400 text-sm">
                    No products found for "<span className="font-medium text-gray-600">{searchQuery}</span>"
                  </div>
                )}
              </div>
            )}

            {/* Default hint */}
            {searchQuery.trim().length === 0 && (
              <div className="px-5 py-6 flex flex-wrap gap-2">
                <p className="w-full text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Popular Searches</p>
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSearchSelect(p.id)}
                    className="text-sm bg-[#f4ebd0]/60 hover:bg-[#f4ebd0] text-[#496506] font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl animate-in fade-in duration-300 pointer-events-auto flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Home</Link>
            <Link href="/#collections" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Collections</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Shop</Link>
            <Link 
              href="/cart" 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors flex items-center gap-4"
            >
              My Cart
              {cartItemCount > 0 && (
                <span className="px-3 py-1 bg-[#496506] text-white text-sm font-bold rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {session && (
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">My Profile</Link>
            )}
            <Link href="/#best-sellers" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">Best Sellers</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-light text-gray-800 hover:text-[#496506] transition-colors">About Us</Link>
            {session ? (
              <button 
                onClick={() => {
                  signOut({ callbackUrl: '/' });
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