
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 20, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON', 'INPUT'].includes(target.tagName) || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
      />
      {/* Outer Ring with spring lag */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full z-[9998] pointer-events-none"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0)',
        }}
      />
    </>
  );
};
