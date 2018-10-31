'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = _dotenv2.default.config();

if (result.error) {
  throw result.error;
}

var env = {};

Object.keys(result.parsed).forEach(function (key) {
  var value = result.parsed[key];
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    env[key] = value === 'true';
  } else if (!isNaN(value)) {
    env[key] = Number(value);
  } else {
    env[key] = value;
  }
});

module.exports = env;