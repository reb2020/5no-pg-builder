export default function({ type = 'LEFT', builder, primaryTableField, secondaryTableField }) {
  const secondaryTable = builder.instance()

  let join = {
    type: type,
    secondaryTable: secondaryTable.helpers.table(true),
    primaryTableField: this.helpers.field(primaryTableField),
    secondaryTableField: secondaryTable.helpers.field(secondaryTableField),
    secondaryTableJoin: secondaryTable.helpers.join(),
    secondaryTableFields: secondaryTable.state.fields || [],
    secondaryTableWhere: secondaryTable.state.where || [],
    secondaryTableOrder: secondaryTable.state.order || [],
    secondaryTableGroup: secondaryTable.state.group || [],
    secondaryTableHaving: secondaryTable.state.having || [],
  }

  return join
}
