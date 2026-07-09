export enum ChessState {
    INTRO,
    PLAYING_INTRO,
    PUZZLE_READY,
    PUZZLE_SOLVED,
}

export interface ChessMove {
    from: string;
    to: string;
}
