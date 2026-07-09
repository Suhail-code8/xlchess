import type React from 'react';
import { Crown, Play } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from 'framer-motion';
import { REVEAL_VARIANTS } from './animations';

export interface HeroContentProps {
  title?: string;
  subtitle?: string;
  onPlay?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ title, subtitle, onPlay }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Keep pointer in middle by default
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  
  // Smooth mouse movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });
  
  // Create glow effects
  const surfaceGlow = useMotionTemplate`radial-gradient(120px circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.1), transparent 100%)`;
  const borderMask = useMotionTemplate`radial-gradient(70px circle at ${smoothX}% ${smoothY}%, black, transparent 100%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion) return;
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <article className="flex flex-col gap-8 lg:gap-10 w-full max-w-xl">
      <motion.header variants={REVEAL_VARIANTS} className="flex items-center gap-4">
        <div className="relative w-[3.25rem] h-[3.25rem] rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-950 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(15,23,42,0.12),0_2px_4px_rgba(15,23,42,0.08)]">
          <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_2px_4px_rgba(255,255,255,0.05)]" />
          <Crown size={26} strokeWidth={2.5} className="relative z-10 drop-shadow-md" />
        </div>
        <span className="text-2xl lg:text-[1.75rem] font-extrabold tracking-tight text-slate-900">
          XLChess
        </span>
      </motion.header>
      
      <div className="flex flex-col gap-5 lg:gap-6">
        <motion.h1 variants={REVEAL_VARIANTS} className="heading-1">
          {title || 'Master the Board. Outsmart Your Opponent.'}
        </motion.h1>
        
        <motion.p variants={REVEAL_VARIANTS} className="body-text text-slate-500 leading-[1.7] max-w-[28rem]">
          {subtitle || 'Experience the ultimate chess platform. Play games, solve challenging puzzles, and analyze your moves with state-of-the-art tools designed for true enthusiasts.'}
        </motion.p>
      </div>
      
      <motion.div variants={REVEAL_VARIANTS} className="flex flex-wrap gap-4 mt-2 lg:mt-4">
        <button 
          type="button"
          onClick={onPlay}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="group relative px-8 py-4 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-950 text-white font-bold text-lg flex items-center gap-3 
                     shadow-[0_4px_16px_rgba(15,23,42,0.3),0_2px_4px_rgba(15,23,42,0.2)] 
                     transition-all duration-300 ease-out 
                     hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.4),0_4px_8px_rgba(15,23,42,0.2)] 
                     active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(15,23,42,0.4)] 
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900
                     motion-reduce:transition-none motion-reduce:hover:transform-none"
        >
          {/* Top bevel */}
          <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_2px_6px_rgba(255,255,255,0.05)]" />

          {/* Surface glow */}
          {!prefersReducedMotion && (
            <motion.div 
              className="absolute inset-0 z-0 rounded-xl overflow-hidden pointer-events-none transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
              style={{ background: surfaceGlow }}
            />
          )}

          {/* Border glow */}
          {!prefersReducedMotion && (
            <motion.div 
              className="absolute inset-0 z-0 rounded-xl pointer-events-none transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
              style={{ 
                WebkitMaskImage: borderMask, 
                maskImage: borderMask,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)"
              }}
            />
          )}
          
          <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
            <Play 
              size={20} 
              fill="currentColor" 
              className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:transform-none" 
            />
            Play Now
          </span>
        </button>
      </motion.div>
    </article>
  );
};
