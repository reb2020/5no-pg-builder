'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  this.sql.push('UPDATE');

  this.sql.push(this.helpers.table(true));

  this.sql.push('SET');

  var update = this.helpers.update();
  if (update) {
    this.sql.push(update);
  }

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