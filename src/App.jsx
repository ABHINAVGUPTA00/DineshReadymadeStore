import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import { PRODUCTS } from './data/products';
import { getCustomProducts, getCurrentUser } from './utils/db';
import PageTransition from './components/PageTransition';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  
  // Page Transition
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionAction, setTransitionAction] = useState(null);

  const triggerTransition = (action) => {
    setTransitionAction(() => action);
    setTransitionActive(true);
  };

  const handleTransitionMidpoint = () => {
    if (transitionAction) transitionAction();
    setTimeout(() => setTransitionActive(false), 400);
  };
  
  // Cart States
  const [cartItems, setCartItems] = useState([]);
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({ total: 3499, subtotal: 3499, promoDiscount: 0, shippingFee: 0 });

  // Add Item to Cart
  const handleAddToCart = (product, size, color, qty = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor?.name === color?.name
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedSize: size || product.sizes[0],
            selectedColor: color || product.colors[0],
            quantity: qty
          }
        ];
      }
    });
  };

  // Cart Handlers
  const handleUpdateQuantity = (idx, newQty) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[idx].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleProceedToCheckout = (total, subtotal, promoDiscount, shippingFee) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setCheckoutTotals({ total, subtotal, promoDiscount, shippingFee });
    setIsCheckoutOpen(true);
  };

  // Scroll Helpers
  const scrollToOutfitBuilder = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ede4dd] text-black flex flex-col justify-between selection:bg-[#ff0001] selection:text-white">
      
      {/* Interactive Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <PageTransition 
        isActive={transitionActive} 
        onMidpoint={handleTransitionMidpoint} 
      />

      {/* Main Navigation */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => triggerTransition(() => setIsCartDrawerOpen(true))}
        onScrollToOutfitBuilder={scrollToOutfitBuilder}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onShopClick={() => triggerTransition(() => {
          const shopSection = document.getElementById('catalog-section');
          if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'instant' });
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'instant' });
          }
        })}
      />

      {/* Main Body Content */}
      <main className="flex-grow">
        
        {/* Editorial Hero Banner */}
        <HeroBanner />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={getCustomProducts()}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

      </main>

      {/* Modals & Overlays */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={() => {
            const sub = quickViewProduct.price;
            handleProceedToCheckout(sub, sub, 0, 0);
          }}
          onToggleWishlist={() => {}}
          isWishlisted={false}
        />
      )}

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderTotals={checkoutTotals}
        onClearCart={() => setCartItems([])}
      />

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }} 
      />

      <UserDashboard 
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Footer / Admin Entry */}
      <div className="w-full text-center py-4 text-xs font-mono opacity-20 hover:opacity-100 transition-opacity">
        <button onClick={() => setIsAdminOpen(true)}>Admin Login</button>
      </div>

    </div>
  );
}
