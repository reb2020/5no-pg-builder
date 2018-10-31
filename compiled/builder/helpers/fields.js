'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var fields = [];

  this.state.fields.forEach(function (field) {
    var fieldName = field.table + '.' + field.name;
    var row = '' + fieldName;

    if (field.function) {
      row = field.function + '(' + fieldName + ')';
    }

    fields.push('' + row + (field.alias ? ' AS ' + field.alias : ''));
  });

  return fields;
};