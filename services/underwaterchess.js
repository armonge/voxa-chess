'use strict';

const rp = require('request-promise');
const qs = require('querystring');

function sendMove(fen, move) {
  const query = qs.stringify({
    fen,
    move,
  });
  const url = `http://api.underwaterchess.com/game?${query}`;
    return rp.get(url);
}

module.exports = {
  sendMove,
};
