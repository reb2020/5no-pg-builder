'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  this.sql.push('DELETE');
  this.sql.push('FROM');

  this.sql.push(this.helpers.table(true));

  var joins = this.helpers.join({
    isDeleteMethod: true
  });

  joins.forEach(function (join) {
    _this.sql.push(join);
  });

  var where = this.helpers.where();
  if (where) {
    this.sql.push(where);
  }

  var returning = this.helpers.returning(true);
  if (returning) {
    this.sql.push('RETURNING');
    this.sql.push(returning);
  }
};