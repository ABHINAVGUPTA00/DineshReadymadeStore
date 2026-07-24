import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, Chrome, Twitter } from 'lucide-react';
import { setCurrentUser } from '../utils/db';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  if (!isOpen) return null;

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email) return;
    
    const user = {
      email,
      name: name || email.split('@')[0],
      authProvider: 'email'
    };
    
    setCurrentUser(user);
    if (onLoginSuccess) onLoginSuccess(user);
    onClose();
  };

  const handleSocialAuth = (provider) => {
    // Simulate social login popup delay
    setTimeout(() => {
      const user = {
        email: `user@${provider}.com`,
        name: `User ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        authProvider: provider
      };
      setCurrentUser(user);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-cream-50 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl border border-charcoal-900/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal-900/60 hover:text-maroon-700 hover:bg-cream-200 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-charcoal-900 uppercase tracking-tighter">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm font-bold text-charcoal-900/50 uppercase tracking-widest mt-2">
                Dinesh Readymade Store
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <button 
                onClick={() => handleSocialAuth('google')}
                className="w-full bg-white border-2 border-charcoal-900/10 p-3 rounded-2xl flex items-center justify-center gap-3 font-bold hover:border-maroon-700 transition-colors shadow-sm"
              >
                <Chrome className="w-5 h-5 text-red-500" />
                Continue with Google
              </button>
              <button 
                onClick={() => handleSocialAuth('twitter')}
                className="w-full bg-[#1DA1F2] text-white border-2 border-transparent p-3 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-[#1a8cd8] transition-colors shadow-sm"
              >
                <Twitter className="w-5 h-5" />
                Continue with Twitter
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-charcoal-900/10"></div>
              <span className="text-xs font-bold text-charcoal-900/40 uppercase">OR</span>
              <div className="flex-1 h-px bg-charcoal-900/10"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-black text-charcoal-900/70 mb-1 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required={!isLogin} className="w-full bg-cream-100 border-2 border-charcoal-900/10 rounded-xl p-3 pl-10 font-bold focus:outline-none focus:border-maroon-700" placeholder="John Doe" />
                    <LogIn className="w-4 h-4 absolute left-4 top-4 text-charcoal-900/40" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-black text-charcoal-900/70 mb-1 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-cream-100 border-2 border-charcoal-900/10 rounded-xl p-3 pl-10 font-bold focus:outline-none focus:border-maroon-700" placeholder="hello@example.com" />
                  <Mail className="w-4 h-4 absolute left-4 top-4 text-charcoal-900/40" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-charcoal-900/70 mb-1 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-cream-100 border-2 border-charcoal-900/10 rounded-xl p-3 pl-10 font-bold focus:outline-none focus:border-maroon-700" placeholder="••••••••" />
                  <Lock className="w-4 h-4 absolute left-4 top-4 text-charcoal-900/40" />
                </div>
              </div>

              <button type="submit" className="w-full bg-maroon-700 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-charcoal-900 transition-colors mt-2">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs font-bold text-charcoal-900/60 hover:text-maroon-700 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
