'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var withAlias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var table = this.state.schema + '.' + this.state.table;
  var alias = this.helpers.alias();

  if (withAlias === true) {
    return table + ' AS ' + alias;
  }
  return table;
};