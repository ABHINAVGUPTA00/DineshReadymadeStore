import React, { useState } from 'react';
import { ArrowRight, Check, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-950 text-cream-100 pt-16 pb-8 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Top Newsletter & Guarantee Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
          
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-mono tracking-widest text-maroon-600 uppercase">
              Join Dinesh VIP Club
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-tight">
              Get Exclusive Festive Offers & New Arrival Drops
            </h3>
            <p className="text-xs text-cream-300 font-light">
              Subscribe to get 10% off your first order and priority access to limited edition festive catalogs.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder:text-cream-300/60 focus:outline-none focus:border-maroon-600 flex-grow"
              />
              <button
                type="submit"
                className="bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all flex items-center gap-1.5"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-cream-300">
          
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-cream-100 uppercase tracking-wider">
              Dinesh Readymade Store
            </h4>
            <p className="font-light leading-relaxed">
              Your premier destination for high-fashion ready-to-wear apparel, royal Indian ethnic wear, linen suits, and designer sarees.
            </p>
            <span className="block text-[11px] font-mono text-cream-300/60">
              Main Market, City Centre &bull; Est. 1998
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-cream-100 uppercase tracking-wider">
              Ready-To-Wear
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onSelectCategory('ethnic')} className="hover:text-white">Royal Ethnic Kurtas</button></li>
              <li><button onClick={() => onSelectCategory('suits')} className="hover:text-white">Suits & Blazers</button></li>
              <li><button onClick={() => onSelectCategory('shirts')} className="hover:text-white">Formal & Casual Shirts</button></li>
              <li><button onClick={() => onSelectCategory('women-ethnic')} className="hover:text-white">Women Silk Sarees</button></li>
              <li><button onClick={() => onSelectCategory('outerwear')} className="hover:text-white">Nehru Jackets & Vests</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-cream-100 uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#store-info" className="hover:text-white">Store Address & Directions</a></li>
              <li><a href="#outfit-builder" className="hover:text-white">Interactive Outfit Builder</a></li>
              <li><span className="hover:text-white cursor-pointer">7-Day Easy Returns & Exchanges</span></li>
              <li><span className="hover:text-white cursor-pointer">Free Store Alterations</span></li>
              <li><span className="hover:text-white cursor-pointer">Track Order Status</span></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-cream-100 uppercase tracking-wider">
              Store Guarantees
            </h4>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-maroon-600" /> 100% Genuine Fabrics
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Truck className="w-4 h-4 text-maroon-600" /> Express Shipping Nationwide
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <RefreshCw className="w-4 h-4 text-maroon-600" /> Easy Size Exchange
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-cream-300/60 font-mono gap-4">
          <span>&copy; 2026 DINESH READYMADE STORE. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-maroon-600 fill-current" /> for High Fashion E-Commerce
          </span>
        </div>

      </div>
    </footer>
  );
}
