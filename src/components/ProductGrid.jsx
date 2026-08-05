import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';

export default function ProductGrid({
  products,
  onQuickView
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="catalog-section" className="w-full px-4 md:px-6 py-8 md:py-24 bg-[#ede4dd]">
      
      {/* Category Filters */}
      <div className="flex overflow-x-auto no-scrollbar gap-6 md:gap-8 mb-8 md:mb-12 border-b-2 border-black/10 pb-4 snap-x relative">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`font-bold tracking-widest uppercase text-xs md:text-sm transition-all duration-300 whitespace-nowrap snap-start relative ${
              activeCategory === category.id ? 'text-[#ff0001]' : 'text-black/40 hover:text-black'
            }`}
          >
            {category.name}
            {activeCategory === category.id && (
              <span className="absolute -bottom-[18px] left-0 w-full h-0.5 bg-[#ff0001] shadow-[0_0_8px_rgba(255,0,1,0.5)]"></span>
            )}
          </button>
        ))}
      </div>

      {/* Responsive Grid matching outfit.hellohello.is */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-x-6 md:gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-[#ff0001] font-medium">
            No items available in this category.
          </p>
        </div>
      )}

      {/* Slogan added at the very end of the catalog section */}
      <div className="pt-16 md:pt-40 pb-12">
        <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-[#ff0001]">
          Made to be worn.<br />
          Or judged. Or both.
        </h1>
      </div>
    </section>
  );
}
