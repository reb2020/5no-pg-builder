'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _operations = require('./operations');

var _operations2 = _interopRequireDefault(_operations);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function Builder(pool) {
  var _this = this;

  _classCallCheck(this, Builder);

  _initialiseProps.call(this);

  this.pool = pool;

  this.rowsHandler = function (rows) {
    return rows;
  };
  this.sql = [];
  this.boundVars = [];

  this.state = {
    method: null
  };

  this.helpers = {};

  Object.keys(_helpers2.default).forEach(function (key) {
    _this.helpers[key] = _helpers2.default[key].bind(_this);
  });

  this.methods = {};

  Object.keys(_methods2.default).forEach(function (key) {
    _this.methods[key] = _methods2.default[key].bind(_this);
  });

  this.operations = {
    execute: this.execute,
    rows: this.rows,
    result: this.result,
    query: this.query,
    instance: this.instance
  };

  Object.keys(_operations2.default).forEach(function (key) {
    _this.operations[key] = _operations2.default[key].bind(_this);
  });
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._initMethod = function () {
    switch (_this2.state.method) {
      case 'select':
        _this2.methods.select();
        break;
      case 'count':
        _this2.methods.count();
        break;
      case 'insert':
        _this2.methods.insert();
        break;
      case 'update':
        _this2.methods.update();
        break;
      case 'delete':
        _this2.methods.delete();
        break;
    }
  };

  this._rowsHandler = function (rows) {
    return new Promise(function (resolve, reject) {
      Promise.resolve(_this2.rowsHandler(rows, _this2.state.method)).then(resolve).catch(reject);
    });
  };

  this.query = function () {
    _this2._initMethod();
    return {
      query: _this2.sql.join(' '),
      vars: _this2.boundVars
    };
  };

  this.execute = function () {
    var queryData = _this2.query();
    var pool = _this2.pool;

    return new Promise(function (resolve, reject) {
      pool(queryData.query, queryData.vars).then(function (result) {
        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && _this2.state.method !== 'count') {
          _this2._rowsHandler(result.rows || []).then(function (rows) {
            resolve(_extends({}, result, { rows: rows }));
          }).catch(reject);
        } else {
          resolve(result);
        }
      }).catch(reject);
    });
  };

  this.rows = function () {
    return new Promise(function (resolve, reject) {
      _this2.execute().then(function (result) {
        resolve(result.rows || []);
      }).catch(reject);
    });
  };

  this.result = function () {
    if (_this2.state.method !== 'count') {
      throw new Error('This method is used only for count');
    }
    return new Promise(function (resolve, reject) {
      _this2.execute().then(function (result) {
        resolve(result.rows.reduce(function (acc, _ref) {
          var count_rows = _ref.count_rows;
          return acc + Number(count_rows);
        }, 0));
      }).catch(reject);
    });
  };

  this.instance = function () {
    return _this2;
  };
};

module.exports = Builder;