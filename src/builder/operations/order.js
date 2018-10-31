export default function(field, direction) {
  if (!this.state.order) {
    this.state.order = []
  }

  direction = typeof direction !== 'undefined' && direction.toUpperCase()
  if (direction !== 'ASC' &&
       direction !== 'DESC') {
    direction = 'ASC'
  }

  this.state.order.push({field: this.helpers.field(field), direction: direction})
  return this.operations
}
