import type React from 'react';
import { useEffect } from 'react';
import { HeroContent } from './HeroContent';
import { FloatingPieces } from './FloatingPieces';
import { usePuzzle } from './Chess/usePuzzle';
import { ChessBoard } from './Chess/ChessBoard';
import { ChessControls } from './Chess/ChessControls';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { STAGGER_CONTAINER, REVEAL_VARIANTS } from './animations';

export const Hero: React.FC = () => {
  const { state, fen, startIntro, resetPuzzle, replayFullGame } = usePuzzle();
  const prefersReducedMotion = useReducedMotion();

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400, mass: 0.5 });
  
  // Parallax transforms
  const rightColumnX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const rightColumnY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rightColumnRotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const rightColumnRotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  // Autoplay for accessibility
  useEffect(() => {
    if (prefersReducedMotion) {
      startIntro();
    }
  }, [prefersReducedMotion, startIntro]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion) return;
    // Reset mouse
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-50 perspective-[1200px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : REVEAL_VARIANTS}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0"
      >
        <FloatingPieces />
      </motion.div>
      
      <motion.div 
        className="container-responsive relative z-10 py-16 lg:py-0"
        variants={prefersReducedMotion ? undefined : STAGGER_CONTAINER}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          if (!prefersReducedMotion) {
            startIntro();
          }
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col w-full order-1">
            <HeroContent onPlay={startIntro} />
          </div>
          
          <motion.div 
            variants={prefersReducedMotion ? undefined : REVEAL_VARIANTS} 
            className="flex flex-col w-full order-2 max-w-xl mx-auto lg:ml-auto lg:mr-0 transform-gpu relative"
            style={prefersReducedMotion ? {} : { 
              x: rightColumnX, 
              y: rightColumnY,
              rotateX: rightColumnRotateX,
              rotateY: rightColumnRotateY
            }}
          >
            {/* Board shadow */}
            <div className="absolute inset-4 bg-slate-900/5 blur-[60px] translate-y-12 -z-10" />

            <motion.div 
              animate={prefersReducedMotion ? undefined : {
                y: [0, -6, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_32px_64px_-16px_rgba(15,23,42,0.06),0_0_32px_rgba(15,23,42,0.02)] rounded-[1.5rem] lg:rounded-[2rem] p-3 sm:p-4 lg:p-5 flex flex-col gap-4 lg:gap-5 transition-all duration-500 ease-out hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_48px_80px_-16px_rgba(15,23,42,0.08),0_0_40px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:border-slate-300"
            >
              <ChessBoard fen={fen} state={state} />
              <ChessControls 
                state={state} 
                onReset={resetPuzzle} 
                onReplay={replayFullGame} 
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
