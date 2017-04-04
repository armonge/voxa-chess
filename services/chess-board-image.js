'use strict';

const rp = require('request-promise');
const qs = require('querystring');

function getBoardImage(fen) {
  const query = qs.stringify({
    fen,
  });
  const url = `https://pan2swldnb.execute-api.us-east-1.amazonaws.com/dev?${query}`;
  return rp.get(url)
    .then(JSON.parse)
}

module.exports = {
  getBoardImage,
};
