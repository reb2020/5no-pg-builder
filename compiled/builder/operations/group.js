"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fields) {
  var _this = this;

  if (!this.state.group) {
    this.state.group = [];
  }

  fields.forEach(function (field) {
    _this.state.group.push(_this.helpers.field(field));
  });

  return this.operations;
};