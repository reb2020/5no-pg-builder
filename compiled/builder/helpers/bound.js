'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (value) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return '$' + this.boundVars.push(JSON.stringify(value));
  }
  return '$' + this.boundVars.push(value);
};