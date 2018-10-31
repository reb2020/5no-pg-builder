export default function(field, operator = '=', value) {
  if (!this.state.where) {
    this.state.where = []
  }

  this.state.where.push(this.helpers.whereData({
    field: field,
    operator: operator,
    values: value,
  }))

  return this.operations
}
