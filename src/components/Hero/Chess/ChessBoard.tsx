import type React from 'react';
import { Chessboard as ReactChessboard } from 'react-chessboard';
import { ChessState } from './types';

interface ChessBoardProps {
  fen: string;
  state: ChessState;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ fen, state }) => {
  const isInteractive = state === ChessState.PUZZLE_READY;

  return (
    <div className="w-full aspect-square rounded-xl lg:rounded-2xl overflow-hidden border border-slate-100 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] bg-slate-50/50">
      <div className={`w-full h-full rounded overflow-hidden ${isInteractive ? '' : 'pointer-events-none'}`}>
        <ReactChessboard options={{ position: fen, allowDragging: isInteractive, animationDurationInMs: 500 }} />
      </div>
    </div>
  );
};
