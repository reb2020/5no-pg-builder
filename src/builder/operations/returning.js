export default function(fields = ['*']) {
  this.state.returning = fields
  return this.operations
}
