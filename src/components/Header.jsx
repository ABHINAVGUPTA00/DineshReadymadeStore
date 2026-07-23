import React from 'react';

export default function Header({
  cartCount,
  onOpenCart,
  onScrollToOutfitBuilder,
  currentUser,
  onOpenAuth,
  onOpenDashboard
}) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-6 text-[18px] md:text-[22px] font-medium leading-none sticky top-0 z-50 bg-[#ede4dd]">
      {/* Left Logo */}
      <div 
        className="font-black text-[#ff0001] cursor-pointer" 
        onClick={onScrollToOutfitBuilder}
      >
        DRS
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 md:gap-8 text-[#ff0001]">
        
        {currentUser ? (
          <button onClick={onOpenDashboard} className="hover:opacity-80 transition-opacity font-bold truncate max-w-[120px] md:max-w-none">
            Hi, {currentUser.name.split(' ')[0]}
          </button>
        ) : (
          <button onClick={onOpenAuth} className="hover:opacity-80 transition-opacity font-bold">
            Sign In
          </button>
        )}

        <button className="hidden md:block relative group overflow-hidden">
          <span className="block relative z-10 transition-transform duration-300 group-hover:-translate-y-full">Shop</span>
          <span className="absolute left-0 top-full w-full transition-transform duration-300 group-hover:-translate-y-full underline decoration-[1.5px] underline-offset-4">Shop</span>
        </button>

        <button onClick={onOpenCart} className="hover:opacity-80 transition-opacity">
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
