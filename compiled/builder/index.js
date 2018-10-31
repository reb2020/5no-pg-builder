'use strict';

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
      pool(queryData.query, queryData.vars).then(function (results) {
        resolve(results);
      }).catch(reject);
    });
  };

  this.instance = function () {
    return _this2;
  };
};

module.exports = Builder;