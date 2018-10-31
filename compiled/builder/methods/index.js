'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _delete = require('./delete');

var _delete2 = _interopRequireDefault(_delete);

var _insert = require('./insert');

var _insert2 = _interopRequireDefault(_insert);

var _count = require('./count');

var _count2 = _interopRequireDefault(_count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  select: _select2.default,
  update: _update2.default,
  delete: _delete2.default,
  insert: _insert2.default,
  count: _count2.default
};