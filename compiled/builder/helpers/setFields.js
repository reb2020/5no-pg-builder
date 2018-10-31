'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fields) {
  var _this = this;

  var setFields = [];

  fields.forEach(function (fieldName) {
    var regExp = /\(([^)]+)\)/;
    var name = fieldName.trim();
    var alias = '';
    var functionName = null;

    var check = name.split(' ');
    if (check.length === 3 && check[1].toLowerCase() === 'as') {
      name = check[0];
      alias = check[2];
    }

    var matches = regExp.exec(name);
    if (matches && matches[1]) {
      var functionNameCheck = name.split('(');
      name = matches[1];
      functionName = functionNameCheck[0];
    }

    setFields.push({
      name: name,
      alias: alias,
      function: functionName,
      table: _this.helpers.alias()
    });
  });

  return setFields;
};