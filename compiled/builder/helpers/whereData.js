'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var _this = this;

  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 'AND' : _ref$type,
      field = _ref.field,
      _ref$operator = _ref.operator,
      operator = _ref$operator === undefined ? '=' : _ref$operator,
      values = _ref.values,
      _ref$group = _ref.group,
      group = _ref$group === undefined ? null : _ref$group;

  var boundValues = [];

  if (typeof values === 'undefined' || (typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    values = [values];
  }

  values.forEach(function (value) {
    boundValues.push(_this.helpers.bound(value));
  });

  return {
    group: group,
    type: type,
    field: field,
    table: this.helpers.alias(),
    operator: operator.toLowerCase(),
    values: values,
    boundValues: boundValues
  };
};