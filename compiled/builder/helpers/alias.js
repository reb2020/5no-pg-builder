'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return typeof this.state.alias !== 'undefined' ? this.state.alias : this.state.table;
};