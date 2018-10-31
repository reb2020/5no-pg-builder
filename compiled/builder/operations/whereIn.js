'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field, values) {
  this.operations.where(field, 'IN', values);
  return this.operations;
};