"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (limit) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  this.state.limit = {
    limit: limit,
    offset: offset
  };
  return this.operations;
};