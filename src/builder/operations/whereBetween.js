export default function(field, from, to) {
  this.operations.where(field, 'BETWEEN', [from, to])
  return this.operations
}
