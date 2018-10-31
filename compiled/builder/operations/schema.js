"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  this.state.schema = schema;
  return this.operations;
};