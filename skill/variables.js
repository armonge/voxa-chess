'use strict';

module.exports = {
  move: model => model.move,
  board: model => model.chess.ascii(),
  smallBoardImage: model => model.getBoardImage().then(response => response.smallImageUrl),
  largeBoardImage: model => model.getBoardImage().then(response => response.largeImageUrl),
};
