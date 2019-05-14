'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var _this = this;

  var values = [];
  var fields = [];

  Object.keys(data).forEach(function (field) {
    fields.push(field);
    values.push(data[field] === null ? 'NULL' : _this.helpers.bound(data[field]));
  });

  return {
    fields: fields,
    values: values
  };
};