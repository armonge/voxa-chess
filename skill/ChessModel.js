'use strict';

const _ = require('lodash');
const Chess = require('chess.js').Chess;
const getBoardImage = require('../services/chess-board-image').getBoardImage;

class Model {
  constructor(data) {
    if (typeof data === 'undefined') {
      this.chess = new Chess();
    } else {
      this.chess = new Chess(data.chess);
    }

    _.assign(this, _.omit(data, 'chess'));
  }

  getBoardImage() {
    return getBoardImage(this.chess.fen());
  }

  static fromEvent(alexaEvent) {
    return new this(alexaEvent.session.attributes.modelData);
  }

  serialize() {
    return _.merge({}, this, { chess: this.chess.fen() });
  }
}

module.exports = Model;

