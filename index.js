'use strict';

const Chess = require('chess.js').Chess;
const chess = new Chess();

while (!chess.game_over()) {
    let moves = chess.moves({ verbose: true });
    let move = moves[Math.floor(Math.random() * moves.length)];
    console.log(move);
    chess.move(move);
    console.log(chess.ascii());
    console.log('------------------------------------------------------------')
}

