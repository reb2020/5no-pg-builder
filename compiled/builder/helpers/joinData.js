'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 'LEFT' : _ref$type,
      builder = _ref.builder,
      primaryTableField = _ref.primaryTableField,
      secondaryTableField = _ref.secondaryTableField;

  var secondaryTable = builder.instance();

  var join = {
    type: type,
    secondaryTable: secondaryTable.helpers.table(true),
    primaryTableField: this.helpers.field(primaryTableField),
    secondaryTableField: secondaryTable.helpers.field(secondaryTableField),
    secondaryTableJoin: secondaryTable.helpers.join(),
    secondaryTableFields: secondaryTable.state.fields || [],
    secondaryTableWhere: secondaryTable.state.where || [],
    secondaryTableOrder: secondaryTable.state.order || [],
    secondaryTableGroup: secondaryTable.state.group || [],
    secondaryTableHaving: secondaryTable.state.having || []
  };

  return join;
};