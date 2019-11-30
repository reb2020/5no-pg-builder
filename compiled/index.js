'use strict';

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function Manager() {
  var _this = this;

  _classCallCheck(this, Manager);

  this.query = function (q, valuesIn) {
    return (0, _query2.default)(_connect2.default, q, valuesIn);
  };

  this.build = function (_ref) {
    var table = _ref.table,
        _ref$schema = _ref.schema,
        schema = _ref$schema === undefined ? 'public' : _ref$schema,
        alias = _ref.alias,
        rowsHandler = _ref.rowsHandler;

    var builder = new _builder2.default(_this.query);

    builder.operations.table(table);
    builder.operations.schema(schema);
    builder.operations.alias(alias);

    if (rowsHandler) {
      builder.rowsHandler = rowsHandler;
    }

    return builder.operations;
  };

  this.begin = function () {
    return _this.query('BEGIN');
  };

  this.commit = function () {
    return _this.query('COMMIT');
  };

  this.rollback = function () {
    return _this.query('ROLLBACK');
  };
};

module.exports = new Manager();