'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  this.sql.push('INSERT INTO');
  this.sql.push(this.helpers.table());

  var data = this.helpers.insert();

  this.sql.push('(' + data.fields + ')');
  this.sql.push('VALUES');
  this.sql.push('(' + data.values + ')');

  var onConflict = this.helpers.onConflict();
  if (onConflict) {
    this.sql.push(onConflict);
  }

  var returning = this.helpers.returning();
  if (returning) {
    this.sql.push('RETURNING');
    this.sql.push(returning);
  }
};