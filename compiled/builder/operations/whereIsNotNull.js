'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  this.operations.where(field, 'IS NOT', null);
  return this.operations;
};