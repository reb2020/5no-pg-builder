'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  this.sql.push('DELETE');
  this.sql.push('FROM');

  this.sql.push(this.helpers.table(true));

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