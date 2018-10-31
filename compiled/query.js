'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _env = require('./env');

var query = function query(pool, q, valuesIn) {
  var values = valuesIn || [];
  if (_env.DATABASE_QUERY_LOG) {
    process.stdout.write('SQL: ' + q + ' with values ' + values.join(',') + '\n');
  }
  return pool.query(q, values);
};

exports.default = query;