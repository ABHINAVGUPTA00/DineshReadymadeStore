import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRELOADER_IMAGES = [
  '/images/hero_lookbook_banner_1784710931238.png',
  '/images/royal_silk_kurta_1784710967547.png',
  '/images/tailored_linen_suit_1784710982724.png',
  '/images/designer_ethnic_saree_1784710997737.png',
];

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('black'); // 'black' -> 'red' -> 'closing'
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const word = "DINESH";

  useEffect(() => {
    // Rapid image and letter flashing for phase 'black'
    const flashInterval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % PRELOADER_IMAGES.length);
      setLetterIndex((prev) => (prev + 1) % word.length);
    }, 150); // Flash every 150ms

    // Transition to phase 'red'
    const redTimer = setTimeout(() => {
      clearInterval(flashInterval);
      setPhase('red');
    }, 1800); // After 1.8 seconds

    // Transition to phase 'closing'
    const closeTimer = setTimeout(() => {
      setPhase('closing');
      setTimeout(onComplete, 800); // 800ms for slide up animation
    }, 3200); // 1.4 seconds after red phase starts

    return () => {
      clearInterval(flashInterval);
      clearTimeout(redTimer);
      clearTimeout(closeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'closing' && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.87, 0, 0.13, 1] } }}
          className={`fixed inset-0 z-[99999] flex items-center justify-center transition-colors duration-300 ${
            phase === 'black' ? 'bg-[#000000]' : 'bg-[#ff0001]'
          }`}
        >
          {phase === 'black' && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Flashing Center Letter */}
              <div className="absolute z-20 text-[#ede4dd] text-[25vw] md:text-[20vw] font-black leading-none uppercase mix-blend-difference">
                {word[letterIndex]}
              </div>

              {/* Flashing Image */}
              <div className="absolute z-10 w-48 h-64 md:w-72 md:h-96 shadow-2xl rotate-[-10deg]">
                <img
                  src={PRELOADER_IMAGES[activeImgIndex]}
                  alt="Preload flash"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Counter / Label */}
              <div className="absolute right-12 md:right-32 text-white font-mono text-sm tracking-widest z-20">
                00{activeImgIndex + 1}
              </div>
            </div>
          )}

          {phase === 'red' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[#ede4dd] text-3xl md:text-5xl font-black uppercase tracking-tighter"
            >
              DINESH READYMADE STORE.
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

