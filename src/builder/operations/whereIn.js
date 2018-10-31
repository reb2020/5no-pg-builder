export default function(field, values) {
  this.operations.where(field, 'IN', values)
  return this.operations
}
