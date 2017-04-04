'use strict';

module.exports = {
  LaunchIntent: {
    NewGame: { ask: 'We just started a new game for you, what\'s your move?' },
  },
  Board: {
    Show: {
      ask: 'I\'ve sent a card with the current chessboard to your alexa app, what\'s your next move?',
      card: {
        type: 'Standard',
        title: 'Chess Board',
        text: 'This is the current state of the game',
        image: {
          smallImageUrl: '{smallBoardImage}',
          largeImageUrl: '{largeBoardImage}',
        },
      },
    },
  },
  Move: {
    Invalid: { ask: 'Your move was invalid, can you give me anoter move?' },
    Valid: {
      ask: 'Computer moves {move}, what\'s your next move?',
    },
  },
};
