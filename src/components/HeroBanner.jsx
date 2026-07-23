import React from 'react';

export default function HeroBanner() {
  return (
    <section className="w-full bg-[#ede4dd] text-[#ff0001] flex flex-col justify-between pt-12 md:pt-24">
      <div className="w-full flex flex-col">
        {/* Giant Text */}
        <div className="w-full px-6 flex items-end leading-[0.8] pb-4">
          <h1 className="font-bold tracking-tighter text-[16vw] md:text-[12vw] uppercase break-words">
            DINESH READYMADE<br />STORE.
          </h1>
        </div>

        {/* Footer info bar */}
        <div className="w-full border-t border-[#ff0001] px-6 py-6 text-xs md:text-sm font-medium tracking-tight">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 uppercase">
            <div>
              <p>Dinesh Readymade Store</p>
            </div>
            
            <div className="flex flex-col gap-2 normal-case">
              <span className="uppercase text-[10px] md:text-xs tracking-wider">Why</span>
              <p className="max-w-[280px] leading-tight">
                Created by the DRS team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
              </p>
            </div>
            
            <div className="flex flex-col justify-between gap-8">
              <a href="#" className="hover:opacity-70 transition-opacity">Visit DRS Website</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Shipping & Returns</a>
            </div>
            
            <div className="text-right md:text-right">
              <p>&copy; 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
