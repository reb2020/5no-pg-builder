'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  this.sql.push('SELECT');

  if (this.state.distinct) {
    this.sql.push('DISTINCT');
  }

  var joins = this.helpers.join();

  this.sql.push(this.helpers.fields().join(', '));
  this.sql.push('FROM');
  this.sql.push(this.helpers.table(true));

  joins.forEach(function (join) {
    _this.sql.push(join);
  });

  var where = this.helpers.where();
  if (where) {
    this.sql.push(where);
  }

  var group = this.helpers.group();
  if (group) {
    this.sql.push(group);
  }

  var having = this.helpers.having();
  if (having) {
    this.sql.push(having);
  }

  var order = this.helpers.order();
  if (order) {
    this.sql.push(order);
  }

  var limit = this.helpers.limit();
  if (limit) {
    this.sql.push(limit);
  }
};