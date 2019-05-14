export default function(field) {
  this.operations.where(field, 'IS', null)
  return this.operations
}
