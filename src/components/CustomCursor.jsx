import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Find hover targets
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Magnetic Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovered ? 36 : 16),
          y: mousePosition.y - (isHovered ? 36 : 16),
          width: isHovered ? 72 : 32,
          height: isHovered ? 72 : 32,
          backgroundColor: isHovered ? '#ffffff' : 'transparent',
          border: isHovered ? 'none' : '2px solid #ffffff'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.5 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-black uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff0001] rounded-full pointer-events-none z-[99999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
      />
    </>
  );
}
