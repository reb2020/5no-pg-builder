'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  this.state.method = 'update';
  this.state.update = this.helpers.updateData(data);

  return this.operations;
};