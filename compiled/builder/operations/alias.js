"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (alias) {
  this.state.alias = alias;
  return this.operations;
};