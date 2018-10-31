'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var field = _ref.field,
      _ref$operator = _ref.operator,
      operator = _ref$operator === undefined ? '=' : _ref$operator,
      value = _ref.value;

  var fieldData = this.helpers.setFields([field]);

  return _extends({}, fieldData[0], {
    operator: operator.toLowerCase(),
    value: value,
    boundValue: this.helpers.bound(value)
  });
};