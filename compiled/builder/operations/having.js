'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
  var value = arguments[2];

  if (!this.state.having) {
    this.state.having = [];
  }

  this.state.having.push(this.helpers.havingData({
    field: field,
    operator: operator,
    value: value
  }));

  return this.operations;
};