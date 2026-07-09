import type React from 'react';
import { RotateCcw, FastForward } from 'lucide-react';
import { ChessState } from './types';

interface ChessControlsProps {
  state: ChessState;
  onReset: () => void;
  onReplay: () => void;
}

export const ChessControls: React.FC<ChessControlsProps> = ({ state, onReset, onReplay }) => {
  const disabled = state === ChessState.PLAYING_INTRO;
  
  const buttonBaseClass = "group relative flex-1 px-4 py-3 lg:py-3.5 rounded-lg lg:rounded-xl bg-gradient-to-b from-white to-slate-50/80 text-slate-700 font-semibold text-[15px] flex items-center justify-center gap-2.5 border border-slate-200 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06),0_2px_4px_rgba(15,23,42,0.03)] hover:border-slate-300 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400";

  return (
    <div className="flex flex-row justify-between gap-3 sm:gap-4 w-full">
      <button 
        type="button"
        onClick={onReset}
        disabled={disabled}
        className={buttonBaseClass}
      >
        <div className="absolute inset-0 rounded-lg lg:rounded-xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,1)]" />
        <RotateCcw size={18} className="text-slate-500 transition-colors group-hover:text-slate-700" />
        <span>Reset Puzzle</span>
      </button>
      
      <button 
        type="button"
        onClick={onReplay}
        disabled={disabled}
        className={buttonBaseClass}
      >
        <div className="absolute inset-0 rounded-lg lg:rounded-xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,1)]" />
        <FastForward size={18} className="text-slate-500 transition-colors group-hover:text-slate-700" />
        <span>Replay Full Game</span>
      </button>
    </div>
  );
};
