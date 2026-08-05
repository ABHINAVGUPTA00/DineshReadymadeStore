import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, Chrome, Twitter, Phone, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { setCurrentUser } from '../services/database';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authMethod, setAuthMethod] = useState(null); // 'email' | 'phone'
  const [authStep, setAuthStep] = useState('initial'); // 'initial' | 'credentials' | 'otp' | 'processing' | 'success'
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setAuthStep('initial');
      setAuthMethod(null);
      setError('');
      setOtp(['', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSocialAuth = (provider) => {
    setAuthStep('processing');
    setError('');
    // Simulate OAuth redirect and processing
    setTimeout(() => {
      const user = {
        email: `user@${provider}.com`,
        name: `User ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        authProvider: provider
      };
      finishAuth(user);
    }, 1500);
  };

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (authMethod === 'phone' && phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // Move to OTP step
    setAuthStep('processing');
    setTimeout(() => {
      setAuthStep('otp');
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setError('Please enter the complete OTP');
      return;
    }

    setAuthStep('processing');
    // Simulate network verification
    setTimeout(() => {
      if (enteredOtp === '0000') { // Let's say 0000 is invalid for testing
        setError('Invalid OTP code. Please try again.');
        setAuthStep('otp');
        return;
      }

      const user = {
        email: authMethod === 'email' ? email : `${phone}@phone.user`,
        name: name || (authMethod === 'email' ? email.split('@')[0] : 'Valued Customer'),
        phone: authMethod === 'phone' ? phone : null,
        authProvider: authMethod
      };
      finishAuth(user);
    }, 1500);
  };

  const finishAuth = (user) => {
    setAuthStep('success');
    setCurrentUser(user);
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    }, 1500);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-cream-50 rounded-[2rem] p-6 md:p-10 max-w-md w-full relative shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-charcoal-900/10 overflow-hidden"
        >
          {/* Close Button */}
          {authStep !== 'processing' && authStep !== 'success' && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-charcoal-900/40 hover:text-maroon-700 hover:bg-cream-200 p-2 rounded-full transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Dynamic Content Area */}
          <div className="relative min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* --- STEP 1: INITIAL SELECTION --- */}
              {authStep === 'initial' && (
                <motion.div key="initial" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-1 flex flex-col justify-center">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-charcoal-900 uppercase tracking-tighter">
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-xs font-bold text-charcoal-900/40 uppercase tracking-widest mt-2">Dinesh Readymade Store</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <button onClick={() => handleSocialAuth('google')} className="w-full bg-white border-2 border-charcoal-900/10 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:border-maroon-700 hover:shadow-lg transition-all group">
                      <Chrome className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                      Continue with Google
                    </button>
                    <button onClick={() => handleSocialAuth('twitter')} className="w-full bg-[#1DA1F2] text-white border-2 border-transparent p-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-[#1a8cd8] hover:shadow-lg transition-all group">
                      <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Continue with X
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-charcoal-900/10"></div>
                    <span className="text-[10px] font-black text-charcoal-900/40 uppercase tracking-widest">OR USE</span>
                    <div className="flex-1 h-px bg-charcoal-900/10"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setAuthMethod('email'); setAuthStep('credentials'); }} className="bg-cream-100 border-2 border-charcoal-900/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-white transition-all">
                      <Mail className="w-6 h-6" />
                      <span className="text-xs uppercase tracking-wider">Email</span>
                    </button>
                    <button onClick={() => { setAuthMethod('phone'); setAuthStep('credentials'); }} className="bg-cream-100 border-2 border-charcoal-900/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-white transition-all">
                      <Phone className="w-6 h-6" />
                      <span className="text-xs uppercase tracking-wider">Mobile</span>
                    </button>
                  </div>

                  <div className="text-center mt-8">
                    <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-xs font-black text-charcoal-900/40 hover:text-maroon-700 uppercase tracking-widest transition-colors">
                      {authMode === 'login' ? "New here? Create an account" : "Already registered? Sign in"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 2: CREDENTIALS INPUT --- */}
              {authStep === 'credentials' && (
                <motion.div key="credentials" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-1 flex flex-col">
                  <button onClick={() => setAuthStep('initial')} className="text-[10px] font-black uppercase tracking-widest text-charcoal-900/40 hover:text-charcoal-900 mb-6 flex items-center gap-1 w-fit">
                    &larr; Back
                  </button>
                  
                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-charcoal-900 uppercase tracking-tighter">
                      {authMode === 'login' ? 'Login Details' : 'Sign Up Details'}
                    </h2>
                    <p className="text-[10px] font-bold text-charcoal-900/40 uppercase tracking-widest mt-1">
                      Via {authMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                    </p>
                  </div>

                  {error && <div className="bg-maroon-700/10 text-maroon-700 p-3 rounded-xl mb-6 text-xs font-bold text-center border border-maroon-700/20 animate-shake">{error}</div>}

                  <form onSubmit={handleCredentialsSubmit} className="space-y-4 flex-1">
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-[10px] font-black text-charcoal-900/60 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold focus:outline-none focus:border-maroon-700 transition-colors" placeholder="Dinesh Kumar" />
                      </div>
                    )}
                    
                    {authMethod === 'email' ? (
                      <div>
                        <label className="block text-[10px] font-black text-charcoal-900/60 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold focus:outline-none focus:border-maroon-700 transition-colors" placeholder="hello@example.com" />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] font-black text-charcoal-900/60 mb-1.5 uppercase tracking-wider">Mobile Number</label>
                        <div className="flex gap-2">
                          <span className="bg-cream-100 border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold text-charcoal-900/50">+91</span>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} maxLength="10" required className="flex-1 bg-white border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold focus:outline-none focus:border-maroon-700 transition-colors" placeholder="9876543210" />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-black text-charcoal-900/60 mb-1.5 uppercase tracking-wider">Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-white border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold focus:outline-none focus:border-maroon-700 transition-colors" placeholder="••••••••" />
                    </div>

                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-[10px] font-black text-charcoal-900/60 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-white border-2 border-charcoal-900/10 rounded-xl p-3.5 font-bold focus:outline-none focus:border-maroon-700 transition-colors" placeholder="••••••••" />
                      </div>
                    )}

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-maroon-700 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-charcoal-900 transition-colors flex items-center justify-center gap-2 group shadow-[0_4px_14px_rgba(153,27,27,0.39)] hover:shadow-none hover:translate-y-[2px]">
                        Verify & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* --- STEP 3: OTP VERIFICATION --- */}
              {authStep === 'otp' && (
                <motion.div key="otp" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-cream-200 text-charcoal-900 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-charcoal-900 uppercase tracking-tighter mb-2">Verify Identity</h2>
                  <p className="text-xs font-bold text-charcoal-900/50 leading-relaxed mb-8">
                    We've sent a 4-digit security code to<br />
                    <span className="text-maroon-700">{authMethod === 'email' ? email : `+91 ${phone}`}</span>
                  </p>

                  {error && <div className="text-maroon-700 mb-6 text-xs font-bold animate-shake">{error}</div>}

                  <form onSubmit={handleVerifyOtp} className="w-full">
                    <div className="flex justify-center gap-4 mb-8">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-14 h-16 bg-white border-2 border-charcoal-900/10 rounded-2xl text-center text-2xl font-black focus:outline-none focus:border-maroon-700 focus:ring-4 focus:ring-maroon-700/10 transition-all"
                        />
                      ))}
                    </div>
                    
                    <button type="submit" className="w-full bg-charcoal-900 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-maroon-700 transition-colors">
                      Authenticate
                    </button>
                  </form>
                  
                  <button onClick={() => setAuthStep('credentials')} className="mt-8 text-[10px] font-black uppercase tracking-widest text-charcoal-900/40 hover:text-charcoal-900 transition-colors">
                    Use different {authMethod === 'email' ? 'email' : 'number'}
                  </button>
                </motion.div>
              )}

              {/* --- STEP 4: PROCESSING / LOADING --- */}
              {authStep === 'processing' && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-charcoal-900/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-maroon-700 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="mt-6 text-xs font-black uppercase tracking-widest text-charcoal-900 animate-pulse">
                    Authenticating Securely...
                  </p>
                </motion.div>
              )}

              {/* --- STEP 5: SUCCESS --- */}
              {authStep === 'success' && (
                <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-charcoal-900 uppercase tracking-tighter mb-2">Access Granted</h2>
                  <p className="text-xs font-bold text-charcoal-900/50 uppercase tracking-widest">
                    Welcome to Dinesh Readymade
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
