import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const FloatingPieces: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-left wash */}
      <motion.div 
        animate={prefersReducedMotion ? undefined : {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[70%] rounded-full bg-slate-200/60 blur-[130px] lg:blur-[160px]"
      />
      
      {/* Center glow */}
      <motion.div 
        animate={prefersReducedMotion ? undefined : {
          x: [0, 40, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full bg-slate-200/40 blur-[140px] lg:blur-[180px]"
      />

      {/* Board glow */}
      <motion.div 
        animate={prefersReducedMotion ? undefined : {
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] -right-[10%] w-[55%] h-[80%] rounded-full bg-slate-300/30 blur-[120px] lg:blur-[150px]"
      />
      
      {/* Bottom glow */}
      <motion.div 
        animate={prefersReducedMotion ? undefined : {
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute -bottom-[20%] left-[10%] w-[80%] h-[40%] rounded-full bg-slate-100/40 blur-[100px] lg:blur-[140px]"
      />
    </div>
  );
};
