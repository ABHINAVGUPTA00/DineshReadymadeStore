import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';

export default function Header({
  cartCount,
  onOpenCart,
  onScrollToOutfitBuilder,
  currentUser,
  onOpenAuth,
  onOpenDashboard,
  onShopClick,
  onOpenWishlist
}) {
  const { wishlist } = useWishlist();

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-6 text-[15px] md:text-[22px] font-medium leading-none sticky top-0 z-50 bg-[#ede4dd]">
      {/* Left Logo */}
      <div 
        className="font-black text-[#ff0001] cursor-pointer text-lg md:text-2xl" 
        onClick={onScrollToOutfitBuilder}
      >
        DRS
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-8 text-[#ff0001]">
        
        {currentUser ? (
          <button onClick={onOpenDashboard} className="hover:opacity-80 transition-opacity font-bold truncate max-w-[80px] md:max-w-none">
            Hi, {currentUser.name.split(' ')[0]}
          </button>
        ) : (
          <button onClick={onOpenAuth} className="hover:opacity-80 transition-opacity font-bold">
            Sign In
          </button>
        )}

        <button onClick={onShopClick} className="hidden md:block relative group overflow-hidden">
          <span className="block relative z-10 transition-transform duration-300 group-hover:-translate-y-full">Shop</span>
          <span className="absolute left-0 top-full w-full transition-transform duration-300 group-hover:-translate-y-full underline decoration-[1.5px] underline-offset-4">Shop</span>
        </button>

        <button onClick={onOpenWishlist} className="hover:opacity-80 transition-opacity flex items-center gap-1 font-bold md:font-medium whitespace-nowrap">
          <Heart className="w-4 h-4 md:w-5 md:h-5 inline" /> ({wishlist.length})
        </button>

        <button onClick={onOpenCart} className="hover:opacity-80 transition-opacity font-bold md:font-medium whitespace-nowrap">
          Bag ({cartCount})
        </button>

        {/* The 3 Dots (Theme Toggles aesthetic) */}
        <div className="hidden md:flex items-center gap-1.5 ml-2">
          <button className="w-3.5 h-3.5 rounded-full bg-black hover:scale-110 transition-transform" />
          <button className="w-3.5 h-3.5 rounded-full bg-cream border border-black hover:scale-110 transition-transform" />
          <button className="w-3.5 h-3.5 rounded-full bg-[#ff0001] hover:scale-110 transition-transform" />
        </div>
      </div>
    </header>
  );
}
