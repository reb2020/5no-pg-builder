export default function(field, operator = '=', value, group = null) {
  if (!this.state.where) {
    this.state.where = []
  }

  this.state.where.push(this.helpers.whereData({
    type: 'OR',
    group: `group_or_${group}`,
    field: field,
    operator: operator,
    values: value,
  }))

  return this.operations
}
