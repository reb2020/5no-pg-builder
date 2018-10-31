export default function(field, operator = '=', value) {
  if (!this.state.having) {
    this.state.having = []
  }

  this.state.having.push(this.helpers.havingData({
    field: field,
    operator: operator,
    value: value,
  }))

  return this.operations
}
