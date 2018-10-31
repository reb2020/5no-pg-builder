'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  this.state.method = 'count';
  if (field) {
    this.state.fields = this.helpers.setFields([field]);
  }
  return this.operations;
};