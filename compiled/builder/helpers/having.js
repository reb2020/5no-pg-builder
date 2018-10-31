'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var having = [];

  if (this.state.having) {
    this.state.having.forEach(function (havingData) {
      var fieldName = havingData.table + '.' + havingData.name;
      var row = '' + fieldName;

      if (havingData.function) {
        row = havingData.function + '(' + fieldName + ')';
      }

      having.push(row + ' ' + havingData.operator + ' ' + havingData.boundValue);
    });

    return 'HAVING ' + having.join(' AND ');
  }

  return null;
};