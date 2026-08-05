import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({
  product,
  onQuickView
}) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  const frontImage = product.images[0];
  const backImage = product.images[1] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group block cursor-pointer select-none"
      onClick={() => onQuickView(product)}
    >
      
      {/* Image Container with Outfit Signature Reveal Animation */}
      <div className="relative overflow-hidden aspect-[9/12] w-full bg-[#d2cac3] mb-3">
        {/* Front Base Image */}
        <img
          src={frontImage}
          alt={product.name}
          draggable="false"
          className="w-full h-full object-cover aspect-[9/12]"
        />

        {/* Back Image with Signature Clip-Path Curtain Reveal & Brightness Flash */}
        <img
          src={backImage}
          alt={`${product.name} Back view`}
          draggable="false"
          className="h-full w-full object-cover aspect-[9/12] outfit-reveal-back absolute inset-0"
        />
        
        {/* Hover overlay button to hint quick view/add to cart */}
        <div className="absolute inset-x-0 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-10">
          <span className={`text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-full ${product.isOutOfStock ? 'bg-black text-white' : 'bg-[#ff0001] text-white'}`}>
            {product.isOutOfStock ? 'View Details' : 'Quick View'}
          </span>
        </div>

        {/* Out of Stock Overlay */}
        {product.isOutOfStock && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded shadow-lg z-20">
            Out of Stock
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <motion.button 
          whileTap={{ scale: 0.7 }}
          whileHover={{ scale: 1.1 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors z-20 shadow-sm"
        >
          <Heart className={`w-5 h-5 transition-colors ${isWished ? 'fill-[#ff0001] text-[#ff0001]' : 'text-black'}`} />
        </motion.button>
      </div>

      {/* Item Title & Price Row */}
      <div className="flex items-start justify-between gap-2 text-base md:text-lg leading-tight text-[#ff0001]">
        <p className="line-clamp-1">{product.name}</p>
        <p className="flex-shrink-0">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Category Tag (Red Dot + Category Name) */}
      <div className="mt-1 flex items-center gap-1.5 text-[9px] md:text-xs uppercase tracking-wider text-[#ff0001]">
        <div className="h-1.5 w-1.5 rounded-full bg-[#ff0001]" />
        <span>{product.categoryName || product.category || 'APPAREL'}</span>
      </div>
      
    </motion.div>
  );
}
