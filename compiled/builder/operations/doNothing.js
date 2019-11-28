'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this.state.conflict) {
    this.state.conflict.method = 'NOTHING';
    this.state.conflict.updateFields = null;
  }

  return this.operations;
};