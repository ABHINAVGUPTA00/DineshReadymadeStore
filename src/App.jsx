import React, { useState, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import ContactModal from './components/ContactModal';

import Home from './pages/Home';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/User/Profile';

import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { useWishlist } from './context/WishlistContext';
import PageTransition from './components/PageTransition';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({ total: 0, subtotal: 0, promoDiscount: 0, shippingFee: 0 });
  
  const { cartItems, handleUpdateQuantity, handleRemoveItem, clearCart } = useCart();
  const { currentUser, login, logout } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  
  const navigate = useNavigate();
  const location = useLocation();

  const lastClickTimeRef = useRef(0);
  const handleStoreClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 400) {
      setIsAdminOpen(true);
    }
    lastClickTimeRef.current = now;
  };

  const handleProceedToCheckout = (total, subtotal, promoDiscount, shippingFee) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setCheckoutTotals({ total, subtotal, promoDiscount, shippingFee });
    setIsCheckoutOpen(true);
    setIsCartDrawerOpen(false); // Close cart drawer when checking out
  };

  return (
    <div className="min-h-[100dvh] bg-[#ede4dd] text-black flex flex-col justify-between selection:bg-[#ff0001] selection:text-white">
      <CustomCursor />
      <Toaster position="bottom-right" toastOptions={{ className: 'font-bold uppercase tracking-widest text-xs border-2 border-black rounded-xl' }} />

      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <Header
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            onOpenCart={() => setIsCartDrawerOpen(true)}
            onScrollToOutfitBuilder={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenDashboard={() => navigate('/profile')}
            onShopClick={() => {
              navigate('/');
              setTimeout(() => {
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onOpenWishlist={() => setIsWishlistOpen(true)}
          />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home onOpenAuth={() => setIsAuthOpen(true)} onOpenCheckout={handleProceedToCheckout} /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><Profile isOpen={true} onClose={() => navigate('/')} user={currentUser} onLogout={() => { logout(); navigate('/'); }} /></PageTransition>} />
            </Routes>
          </AnimatePresence>

          <CartDrawer
            isOpen={isCartDrawerOpen}
            onClose={() => setIsCartDrawerOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={handleProceedToCheckout}
          />

          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlist={wishlist}
            onRemoveItem={toggleWishlist}
          />

          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
            onLoginSuccess={login} 
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            orderTotals={checkoutTotals}
            onClearCart={clearCart}
          />

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />

          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />


      <footer className="w-full bg-[#ff0001] text-white py-5 mt-auto z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] md:text-sm font-bold uppercase tracking-widest text-white/80 text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Dinesh Readymade <span onClick={handleStoreClick} className="cursor-default select-none">Store</span>. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 md:gap-6 text-[11px] md:text-sm font-bold uppercase tracking-wider text-white/60 whitespace-nowrap">
            <span className="hover:text-white transition-colors cursor-pointer text-center">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer text-center">Terms of Service</span>
            <span onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer text-center">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
