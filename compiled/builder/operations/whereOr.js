'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
  var value = arguments[2];
  var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!this.state.where) {
    this.state.where = [];
  }

  this.state.where.push(this.helpers.whereData({
    type: 'OR',
    group: 'group_or_' + group,
    field: field,
    operator: operator,
    values: value
  }));

  return this.operations;
};