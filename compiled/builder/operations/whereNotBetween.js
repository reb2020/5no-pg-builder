'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field, from, to) {
  this.operations.where(field, 'NOT BETWEEN', [from, to]);
  return this.operations;
};