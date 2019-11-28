'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this.state.insert && this.state.conflict) {
    var _state$conflict = this.state.conflict,
        method = _state$conflict.method,
        updateFields = _state$conflict.updateFields,
        fields = _state$conflict.fields;
    var insert = this.state.insert;
    var aliasField = this.helpers.field;


    var returnData = ['ON CONFLICT (' + fields.join(', ') + ') DO ' + method];

    if (method === 'UPDATE') {
      returnData.push('SET');

      var index = 0;
      var where = [];
      var setData = [];
      insert.fields.forEach(function (field) {
        if (updateFields.includes(field)) {
          setData.push(field + ' = ' + insert.values[index]);
        }
        if (fields.includes(field)) {
          where.push(aliasField(field) + ' = ' + insert.values[index]);
        }
        index++;
      });

      returnData.push(setData.join(', '));
      returnData.push('WHERE');
      returnData.push(where.join(' AND '));
    }

    return returnData.join(' ');
  }

  return null;
};