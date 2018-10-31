'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (field) {
  var alias = this.helpers.alias();
  return alias + '.' + field;
};