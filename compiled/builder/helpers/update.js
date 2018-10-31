'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  if (this.state.update) {
    var data = [];
    var index = 0;

    this.state.update.fields.forEach(function (field) {
      data.push(field + ' = ' + _this.state.update.values[index]);
      index++;
    });

    return data.join(', ');
  }

  return null;
};