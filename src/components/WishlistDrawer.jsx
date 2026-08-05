import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { getCustomProducts } from '../services/database';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem
}) {
  // Derive the full product data for each liked item
  const likedProducts = useMemo(() => {
    const allProducts = getCustomProducts();
    return allProducts.filter(p => wishlist.includes(p.id));
  }, [wishlist]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-[99999] bg-[#ede4dd] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Navbar / Header area of the Bag overlay */}
          <div className="w-full px-4 md:px-6 py-4 md:py-6 flex justify-between items-center text-[#ff0001] font-medium text-[15px] md:text-[22px] tracking-tight relative z-20">
            <div className="font-bold flex items-center">
              <span>++</span>
            </div>
            
            <div className="flex items-center gap-4 md:gap-12">
              <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                Shop
              </button>
              <div className="border-b-2 border-[#ff0001] pb-0.5 flex items-center gap-2">
                Wishlist ({wishlist.length})
              </div>
              <div className="flex gap-1 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <div className="w-2.5 h-2.5 rounded-full border border-[#ff0001]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff0001]"></div>
              </div>
            </div>
          </div>

          {/* Full Screen Content */}
          {likedProducts.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center relative w-full h-full text-center overflow-hidden">
              <h1 className="font-bold tracking-tighter text-[18vw] md:text-[15vw] leading-[0.8] text-[#ff0001] uppercase whitespace-nowrap overflow-hidden">
                WISHLIST
              </h1>
              
              <div className="w-full border-t-2 border-[#ff0001] my-[2vw]"></div>
              
              <h1 className="font-bold tracking-tighter text-[11vw] md:text-[8vw] leading-[0.8] text-[#ff0001] uppercase">
                Nothing liked?<br />Start exploring.
              </h1>
            </div>
          ) : (
            <div className="flex-1 flex flex-col w-full h-full px-4 md:px-6 pt-8 md:pt-12 pb-24 overflow-y-auto relative z-20">
              <h1 className="font-bold tracking-tighter text-[10vw] md:text-[8vw] leading-[0.8] text-[#ff0001] uppercase mb-12">
                YOUR WISHLIST
              </h1>
              
              <div className="max-w-4xl w-full border-t-2 border-[#ff0001] pt-6 flex flex-col gap-8">
                {likedProducts.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center text-[#ff0001]">
                    <div className="w-24 h-32 md:w-32 md:h-44 bg-[#d2cac3] overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl md:text-3xl font-bold tracking-tight">{item.name}</h3>
                        <button onClick={() => onRemoveItem(item.id)} className="hover:opacity-50">
                          <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-6">
                        <div className="text-xl font-bold ml-auto">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
