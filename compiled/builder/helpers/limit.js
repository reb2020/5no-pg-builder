"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this.state.limit) {
    var limit = "LIMIT " + this.state.limit.limit;
    if (this.state.limit.offset) {
      limit = limit + (" OFFSET " + this.state.limit.offset);
    }
    return limit;
  }

  return null;
};