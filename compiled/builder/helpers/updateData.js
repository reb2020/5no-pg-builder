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
    if (typeof data[field].builder !== 'undefined') {
      values.push(data[field].builder.instance().helpers.alias() + '.' + data[field].field);
    } else {
      values.push(_this.helpers.bound(data[field]));
    }
  });

  return {
    fields: fields,
    values: values
  };
};