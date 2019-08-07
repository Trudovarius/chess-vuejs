// FILE WITH CONSTANTS

export const pieces = {
    none:  -1,      // pomocne pole
    empty:      0,      // prazdne pole
    wKing:      1,      // biely kral
    wQueen:     2,      // biela kralovna
    wRook:      3,      // biela veza
    wBishop:    4,      // biely strelec
    wKnight:    5,      // biely kon
    wPawn:      6,      // biely pesiak
    bKing:      7,      // cierny kral
    bQueen:     8,      // cierna kralovna
    bRook:      9,      // cierna veza
    bBishop:   10,      // cierny strelec
    bKnight:   11,      // cierny kon
    bPawn:     12,      // cierny pesiak
};

export const players = {
    white: 0,
    black: 1
};

export const names = [
    '',
    'wKing.png',
    'wQueen.png',
    'wRook.png',
    'wBishop.png',
    'wKnight.png',
    'wPawn.png',
    'bKing.png',
    'bQueen.png',
    'bRook.png',
    'bBishop.png',
    'bKnight.png',
    'bPawn.png'
];

export const startBoard = [
    pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.wRook,    pieces.wKnight,  pieces.wBishop,  pieces.wKing,    pieces.wQueen,   pieces.wBishop,  pieces.wKnight,  pieces.wRook,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.wPawn,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.empty,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.bPawn,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.bRook,    pieces.bKnight,  pieces.bBishop,  pieces.bKing,    pieces.bQueen,   pieces.bBishop,  pieces.bKnight,  pieces.bRook,    pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none,
    pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none, pieces.none
];