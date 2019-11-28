"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (!this.state.conflict) {
    this.state.conflict = {
      fields: fields,
      updateFields: null,
      method: null
    };
  }

  return this.operations;
};