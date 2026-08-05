import React from 'react';

export default function HeroBanner({ onOpenShippingReturns }) {
  return (
    <section className="w-full bg-[#ede4dd] text-[#ff0001] flex flex-col justify-between pt-12 md:pt-24">
      <div className="w-full flex flex-col">
        {/* Giant Text */}
        <div className="w-full px-4 md:px-6 flex items-end leading-[0.8] pb-4 md:pb-6 pt-4 md:pt-0">
          <h1 className="font-bold tracking-tighter text-[16vw] md:text-[12vw] uppercase leading-[0.85] md:leading-[0.8] break-words md:break-normal">
            DINESH<br className="md:hidden" /> <span className="hidden md:inline"></span>READYMADE<br />STORE.
          </h1>
        </div>

        {/* Footer info bar */}
        <div className="w-full border-t border-[#ff0001] px-4 md:px-6 py-6 md:py-6 text-xs md:text-sm font-medium tracking-tight">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-4 uppercase">
            
            <div className="flex justify-between md:block items-center">
              <p>Dinesh Readymade Store</p>
              <p className="md:hidden">&copy; 2026</p>
            </div>
            
            <div className="flex flex-col gap-3 md:gap-2 normal-case">
              <span className="uppercase text-[10px] md:text-xs tracking-wider text-[#ff0001]/60 md:text-inherit">Why</span>
              <p className="max-w-full md:max-w-[280px] leading-relaxed md:leading-tight">
                Created by the DRS team, this store and signature collection celebrates our collective creativity and passion for apparel. Carefully designed.
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col justify-between md:justify-start items-start gap-4 md:gap-8">
              <a href="#" className="hover:opacity-70 transition-opacity border-b border-[#ff0001]/20 md:border-transparent pb-1 md:pb-0 text-left">Visit DRS Website</a>
              <button onClick={(e) => { e.preventDefault(); onOpenShippingReturns && onOpenShippingReturns(); }} className="hover:opacity-70 transition-opacity border-b border-[#ff0001]/20 md:border-transparent pb-1 md:pb-0 uppercase text-left">Shipping & Returns</button>
            </div>
            
            <div className="hidden md:block text-right">
              <p>&copy; 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
