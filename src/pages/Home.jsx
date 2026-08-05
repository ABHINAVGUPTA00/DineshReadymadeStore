import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import { getCustomProducts } from '../services/database';
import QuickViewModal from '../components/QuickViewModal';
import ShippingReturnsModal from '../components/ShippingReturnsModal';
import NewsletterPopup from '../components/NewsletterPopup';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Home({ onOpenAuth, onOpenCheckout }) {
  const { handleAddToCart } = useCart();
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isShippingReturnsOpen, setIsShippingReturnsOpen] = useState(false);

  return (
    <main className="flex-grow">
      <HeroBanner onOpenShippingReturns={() => setIsShippingReturnsOpen(true)} />
      <ProductGrid
        products={getCustomProducts()}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={() => {
            const sub = quickViewProduct.price;
            onOpenCheckout(sub, sub, 0, 0);
          }}
          onToggleWishlist={() => {}}
          isWishlisted={false}
        />
      )}


      <ShippingReturnsModal
        isOpen={isShippingReturnsOpen}
        onClose={() => setIsShippingReturnsOpen(false)}
      />

      <NewsletterPopup />
    </main>
  );
}
