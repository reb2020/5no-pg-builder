'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  this.operations.where(field, 'IS', null);
  return this.operations;
};