'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pgPool = require('pg-pool');

var _pgPool2 = _interopRequireDefault(_pgPool);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _env = require('./env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!_env.DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL is not set');
}

var params = _url2.default.parse(_env.DATABASE_URL, true);

var auth = params.auth.split(':');

var config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true,
  idleTimeoutMillis: 30000
};

Object.keys(params.query).forEach(function (key) {
  var value = params.query[key];
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    config[key] = value === 'true';
  } else if (!isNaN(value)) {
    config[key] = Number(value);
  } else {
    config[key] = value;
  }
});

exports.default = new _pgPool2.default(config);