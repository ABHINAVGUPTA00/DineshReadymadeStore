import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Use refs to avoid re-binding the event listener which causes micro-stutters
  const hoveredRef = useRef(false);
  const textRef = useRef('');

  // Use motion values to prevent React re-renders on every mouse move (fixes jitter)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for smooth follow
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Dot config (slightly faster/snappier)
  const dotSpringConfig = { damping: 30, stiffness: 450 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    // Check if touch device (avoids running on mobile)
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Find hover targets
      const target = e.target.closest('[data-cursor]');
      if (target) {
        if (!hoveredRef.current) {
          hoveredRef.current = true;
          setIsHovered(true);
        }
        const text = target.getAttribute('data-cursor') || '';
        if (textRef.current !== text) {
          textRef.current = text;
          setCursorText(text);
        }
      } else {
        if (hoveredRef.current) {
          hoveredRef.current = false;
          setIsHovered(false);
        }
        if (textRef.current !== '') {
          textRef.current = '';
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Magnetic Follower Ring */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[99999] rounded-full items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: isHovered ? 72 : 32,
          height: isHovered ? 72 : 32,
          backgroundColor: isHovered ? '#ffffff' : 'transparent',
          border: isHovered ? 'none' : '2px solid #ffffff'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-black uppercase whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#ff0001] rounded-full pointer-events-none z-[99999]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
      />
    </>
  );
}
