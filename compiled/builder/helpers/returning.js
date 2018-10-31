'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  var withAlias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (this.state.returning) {
    var data = [];

    this.state.returning.forEach(function (field) {
      if (withAlias === true) {
        data.push(_this.helpers.field(field));
      } else {
        data.push(field);
      }
    });

    return data.join(', ');
  }

  return null;
};