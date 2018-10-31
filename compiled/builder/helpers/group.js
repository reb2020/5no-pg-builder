'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this.state.group) {
    return 'GROUP BY ' + this.state.group.join(', ');
  }

  return null;
};