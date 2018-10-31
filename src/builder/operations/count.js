export default function(field) {
  this.state.method = 'count'
  if (field) {
    this.state.fields = this.helpers.setFields([field])
  }
  return this.operations
}
