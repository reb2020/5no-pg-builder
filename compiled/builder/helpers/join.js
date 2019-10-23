'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _this = this;

  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var joinString = [];
  var index = 0;
  var isUpdateMethod = false;
  var isDeleteMethod = false;

  if (props && typeof props.isUpdateMethod !== 'undefined') {
    isUpdateMethod = props.isUpdateMethod;
  }

  if (props && typeof props.isDeleteMethod !== 'undefined') {
    isDeleteMethod = props.isDeleteMethod;
  }

  if (this.state.join) {
    var maxIndex = Object.keys(this.state.join).length;
    Object.keys(this.state.join).forEach(function (key) {
      var joinData = _this.state.join[key];

      if (isUpdateMethod === true && index === 0) {
        if (!_this.state.where) {
          _this.state.where = [];
        }

        joinString.push('FROM ' + joinData.secondaryTable);

        _this.state.where.push(_this.helpers.whereData({
          field: joinData.primaryTableFieldName,
          operator: '=',
          values: {
            builder: joinData.builder,
            field: joinData.secondaryTableFieldName
          }
        }));
      } else if (isDeleteMethod === true) {
        if (!_this.state.where) {
          _this.state.where = [];
        }

        if (index === 0) {
          joinString.push('USING');
        }

        joinString.push('' + joinData.secondaryTable + (maxIndex === index + 1 ? '' : ','));

        _this.state.where.push(_this.helpers.whereData({
          field: joinData.primaryTableFieldName,
          operator: '=',
          values: {
            builder: joinData.builder,
            field: joinData.secondaryTableFieldName
          }
        }));
      } else {
        switch (joinData.type) {
          case 'LEFT':
            joinString.push('LEFT JOIN ' + joinData.secondaryTable + ' ON ' + joinData.primaryTableField + ' = ' + joinData.secondaryTableField);
            break;
          case 'RIGHT':
            joinString.push('RIGHT JOIN ' + joinData.secondaryTable + ' ON ' + joinData.primaryTableField + ' = ' + joinData.secondaryTableField);
            break;
          case 'INNER':
            joinString.push('INNER JOIN ' + joinData.secondaryTable + ' ON ' + joinData.primaryTableField + ' = ' + joinData.secondaryTableField);
            break;
        }
      }

      joinData.secondaryTableJoin.forEach(function (secondaryJoin) {
        joinString.push(secondaryJoin);
      });

      joinData.secondaryTableFields.forEach(function (secondaryField) {
        if (!_this.state.fields) {
          _this.state.fields = [];
        }

        _this.state.fields.push(secondaryField);
      });

      joinData.secondaryTableWhere.forEach(function (secondaryWhere) {
        if (!_this.state.where) {
          _this.state.where = [];
        }
        var boundValues = [];

        secondaryWhere.values.forEach(function (value) {
          boundValues.push(value === null ? 'NULL' : _this.helpers.bound(value));
        });

        secondaryWhere.boundValues = boundValues;

        _this.state.where.push(secondaryWhere);
      });

      joinData.secondaryTableOrder.forEach(function (secondaryOrder) {
        if (!_this.state.order) {
          _this.state.order = [];
        }

        _this.state.order.push(secondaryOrder);
      });

      joinData.secondaryTableGroup.forEach(function (secondaryGroup) {
        if (!_this.state.group) {
          _this.state.group = [];
        }

        _this.state.group.push(secondaryGroup);
      });

      joinData.secondaryTableHaving.forEach(function (secondaryHaving) {
        if (!_this.state.having) {
          _this.state.having = [];
        }

        _this.state.having.push(secondaryHaving);
      });

      index++;
    });
  }

  return joinString;
};