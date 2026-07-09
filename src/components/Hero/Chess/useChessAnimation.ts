import { useEffect, useRef } from 'react';
import type { ChessMove } from './types';

interface UseChessAnimationProps {
    moves: ChessMove[];
    isPlaying: boolean;
    onMove: (move: ChessMove) => void;
    onComplete: () => void;
}

export const CHESS_TIMING = {
    introDelay: 800,
    moveDelay: 1000,
    finalPause: 1500
};

export const useChessAnimation = ({ moves, isPlaying, onMove, onComplete }: UseChessAnimationProps) => {
    const moveIndexRef = useRef(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isPlaying) {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            return;
        }

        const playNextMove = () => {
            if (moveIndexRef.current < moves.length) {
                onMove(moves[moveIndexRef.current]);
                moveIndexRef.current++;
                
                if (moveIndexRef.current < moves.length) {
                    timerRef.current = window.setTimeout(playNextMove, CHESS_TIMING.moveDelay);
                } else {
                    timerRef.current = window.setTimeout(onComplete, CHESS_TIMING.finalPause);
                }
            }
        };

        // Start the sequence
        timerRef.current = window.setTimeout(playNextMove, CHESS_TIMING.introDelay);

        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, [isPlaying, moves, onMove, onComplete]);

    const resetAnimation = () => {
        moveIndexRef.current = 0;
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    return { resetAnimation };
};
