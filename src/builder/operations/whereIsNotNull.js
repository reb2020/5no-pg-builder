export default function(field) {
  this.operations.where(field, 'IS NOT', null)
  return this.operations
}
