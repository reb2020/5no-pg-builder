export default function(builder, primaryTableField, secondaryTableField) {
  if (!this.state.join) {
    this.state.join = []
  }

  this.state.join.push(this.helpers.joinData({
    type: 'INNER',
    builder: builder,
    primaryTableField: primaryTableField,
    secondaryTableField: secondaryTableField,
  }))

  return this.operations
}
