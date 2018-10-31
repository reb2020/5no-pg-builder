'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  this.sql.push('SELECT');

  var distinct = this.state.distinct ? 'DISTINCT ' : '';

  var joins = this.helpers.join();

  this.sql.push('COUNT(' + distinct + this.helpers.fields()[0] + ') AS count_rows');
  this.sql.push('FROM');
  this.sql.push(this.helpers.table(true));

  joins.forEach(function (join) {
    _this.sql.push(join);
  });

  var where = this.helpers.where();
  if (where) {
    this.sql.push(where);
  }
};