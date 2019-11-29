export default function(fields = ['*']) {
  this.state.method = 'select'
  this.state.fields = this.helpers.setFields(fields)
  return this.operations
}
