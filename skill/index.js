'use strict';

const Voxa = require('voxa');
const variables = require('./variables');
const views = require('./views');
const Model = require('./ChessModel');
const underWater = require('../services/underwaterchess');
const _ = require('lodash');

const skill = new Voxa({ variables, views, Model });

module.exports = skill;

skill.onIntent('LaunchIntent', (event) => {
  console.log(event.model.chess.ascii());
  return { reply: 'LaunchIntent.NewGame', to: 'entry' };
});

skill.onIntent('ShowBoardIntent', (event) => {
  return { reply: 'Board.Show', to: 'entry' };
});

skill.onIntent('MoveIntent', (event) => {
  const fen = event.model.chess.fen();
  const movement = getMovement(event.model.chess, event.intent.params);

  if (!movement) {
    console.log(event.model.chess.ascii());
    return { to: 'MoveIntent', reply: 'Move.Invalid' };
  }

  console.log('player moves', movement);
  console.log(event.model.chess.ascii());

  return underWater.sendMove(fen, `${movement.from}${movement.to}`)
  .then((underWaterResponse) => {
    underWaterResponse = JSON.parse(underWaterResponse);
    console.log('computer moves', underWaterResponse.turn.bestMove);
    event.model.chess.move(underWaterResponse.turn.bestMove, { sloppy: true });
    console.log(event.model.chess.ascii());

    event.model.move = underWaterResponse.turn.bestMove;
    return { reply: 'Move.Valid', to: 'entry' };
  });
});

function getMovement(chess, params) {
  const piece = pieces[params.piece];
  const position = params.position.split(' ').join('').toLowerCase();
  const possibleMoves = chess.moves({ verbose: true });
  let move;

  let posibilities = _.filter(possibleMoves, { to: position });
  if (posibilities.length === 1) {
    return chess.move(posibilities[0].san);
  }

  posibilities = _.filter(possibleMoves, { piece });
  if (posibilities.length === 1) {
    return chess.move(posibilities[0].san);
  }

  return chess.move(move);
}

const pieces = {
  king: 'k',
  queen: 'q',
  rook: 'r',
  bishop: 'b',
  knight: 'n',
  pawn: 'p',
};
