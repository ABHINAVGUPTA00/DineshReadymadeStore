import React, { useState } from 'react';
import { Sparkles, Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function OutfitBuilder({ products, onAddOutfitToCart }) {
  const tops = products.filter((p) => p.outfitType === 'top');
  const bottoms = products.filter((p) => p.outfitType === 'bottom');
  const outerwears = products.filter((p) => p.outfitType === 'outerwear');

  const [selectedTop, setSelectedTop] = useState(tops[0] || products[0]);
  const [selectedBottom, setSelectedBottom] = useState(bottoms[0] || products[5] || products[1]);
  const [selectedOuter, setSelectedOuter] = useState(outerwears[0] || products[1] || products[4]);
  const [isAdded, setIsAdded] = useState(false);

  const rawTotal = (selectedTop?.price || 0) + (selectedBottom?.price || 0) + (selectedOuter?.price || 0);
  const bundleDiscount = Math.round(rawTotal * 0.15); // 15% Combo savings
  const finalPrice = rawTotal - bundleDiscount;

  const handleAddBundle = () => {
    onAddOutfitToCart([selectedTop, selectedBottom, selectedOuter]);
    setIsAdded(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="outfit-builder" className="my-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-black text-[#ede4dd] rounded-2xl p-6 md:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff0001]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ff0001] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Lookbook Stacker
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter uppercase text-[#ede4dd]">
              Build Your Outfit Bundle
            </h2>
            <p className="text-sm text-cream-300 font-light mt-1">
              Select a Top, Trouser, and Outerwear to create your custom outfit stack. Save an extra <strong>15% Combo Discount</strong> on 3-piece outfits.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/15">
            <span className="text-xs text-cream-300">Bundle Savings:</span>
            <span className="text-sm font-extrabold text-[#ff0001]">Save ₹{bundleDiscount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Builder Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Column: Selector Triggers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Top Picker */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff0001] font-mono">
                  Step 1: Top / Kurta / Shirt
                </span>
                <span className="text-xs text-cream-300 font-semibold">{selectedTop?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {tops.map((top) => (
                  <motion.button
                    key={top.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTop(top)}
                    data-cursor="select"
                    className={`relative rounded-lg overflow-hidden aspect-[3/4] border transition-all text-left ${
                      selectedTop?.id === top.id
                        ? 'border-[#ff0001] ring-2 ring-[#ff0001] opacity-100'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={top.images[0]} alt={top.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-end">
                      <span className="text-[11px] font-bold text-white line-clamp-1">{top.name}</span>
                      <span className="text-[10px] text-cream-300">₹{top.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 2: Bottom Picker */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff0001] font-mono">
                  Step 2: Bottom / Trousers / Churidar
                </span>
                <span className="text-xs text-cream-300 font-semibold">{selectedBottom?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {bottoms.map((bottom) => (
                  <motion.button
                    key={bottom.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBottom(bottom)}
                    data-cursor="select"
                    className={`relative rounded-lg overflow-hidden aspect-[3/4] border transition-all text-left ${
                      selectedBottom?.id === bottom.id
                        ? 'border-[#ff0001] ring-2 ring-[#ff0001] opacity-100'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={bottom.images[0]} alt={bottom.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-end">
                      <span className="text-[11px] font-bold text-white line-clamp-1">{bottom.name}</span>
                      <span className="text-[10px] text-cream-300">₹{bottom.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 3: Outerwear Picker */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff0001] font-mono">
                  Step 3: Outerwear / Jacket / Suit
                </span>
                <span className="text-xs text-cream-300 font-semibold">{selectedOuter?.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {outerwears.map((outer) => (
                  <motion.button
                    key={outer.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedOuter(outer)}
                    data-cursor="select"
                    className={`relative rounded-lg overflow-hidden aspect-[3/4] border transition-all text-left ${
                      selectedOuter?.id === outer.id
                        ? 'border-[#ff0001] ring-2 ring-[#ff0001] opacity-100'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={outer.images[0]} alt={outer.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-end">
                      <span className="text-[11px] font-bold text-white line-clamp-1">{outer.name}</span>
                      <span className="text-[10px] text-cream-300">₹{outer.price}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Paired Outfit Canvas */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/5 p-6 rounded-xl border border-white/10">
            
            <div>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-4 flex items-center justify-between">
                <span>Custom Paired Stack</span>
                <span className="text-xs font-mono bg-[#ff0001] text-white px-2 py-0.5 rounded font-bold">
                  3 ITEMS BUNDLE
                </span>
              </h3>

              {/* Stack Preview Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[selectedTop, selectedBottom, selectedOuter].map((item, idx) => (
                  <AnimatePresence mode="wait" key={idx}>
                    <motion.div
                      key={item?.id || idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/20 mb-2 relative shadow-lg">
                        <img src={item?.images[0]} alt={item?.name} className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-mono">
                          {idx === 0 ? 'Top' : idx === 1 ? 'Bottom' : 'Outer'}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-white line-clamp-1">{item?.name}</span>
                      <span className="text-[10px] text-cream-300 font-mono">₹{item?.price}</span>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-sans">
                <div className="flex justify-between text-cream-300">
                  <span>Items Total Price:</span>
                  <span className="line-through">₹{rawTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#ff0001] font-bold">
                  <span>15% Instant Outfit Combo Savings:</span>
                  <span>- ₹{bundleDiscount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Bundle Total:</span>
                  <span className="text-white font-display">₹{finalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddBundle}
                data-cursor="add"
                className={`w-full py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#ff0001] hover:bg-white hover:text-black text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" /> Outfit Bundle Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add Complete Outfit to Bag (Save ₹{bundleDiscount})
                  </>
                )}
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
