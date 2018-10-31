'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var order = [];

  if (this.state.order) {
    this.state.order.forEach(function (orderData) {
      order.push(orderData.field + ' ' + orderData.direction);
    });

    return 'ORDER BY ' + order.join(', ');
  }

  return null;
};