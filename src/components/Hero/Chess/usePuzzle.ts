import { useState, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { ChessState } from './types';
import type { ChessMove } from './types';
import { INITIAL_MOVES } from './moves';
import { useChessAnimation } from './useChessAnimation';

export const usePuzzle = () => {
    const [state, setState] = useState<ChessState>(ChessState.INTRO);
    
    // Internal chess state
    const chessRef = useRef(new Chess());
    
    const [fen, setFen] = useState<string>(chessRef.current.fen());

    const handleMove = useCallback((move: ChessMove) => {
        try {
            chessRef.current.move(move);
            setFen(chessRef.current.fen());
        } catch (e) {
            console.warn("Invalid move", move);
        }
    }, []);

    const handleAnimationComplete = useCallback(() => {
        setState(ChessState.PUZZLE_READY);
    }, []);

    const { resetAnimation } = useChessAnimation({
        moves: INITIAL_MOVES,
        isPlaying: state === ChessState.PLAYING_INTRO,
        onMove: handleMove,
        onComplete: handleAnimationComplete
    });

    const startIntro = useCallback(() => {
        if (state === ChessState.INTRO) {
            setState(ChessState.PLAYING_INTRO);
        }
    }, [state]);

    const resetPuzzle = useCallback(() => {
        chessRef.current.reset();
        INITIAL_MOVES.forEach(m => {
            try { chessRef.current.move(m); } catch (e) {}
        });
        setFen(chessRef.current.fen());
        setState(ChessState.PUZZLE_READY);
    }, []);

    const replayFullGame = useCallback(() => {
        resetAnimation();
        chessRef.current.reset();
        setFen(chessRef.current.fen());
        setState(ChessState.PLAYING_INTRO);
    }, [resetAnimation]);

    return {
        state,
        fen,
        startIntro,
        resetPuzzle,
        replayFullGame
    };
};
