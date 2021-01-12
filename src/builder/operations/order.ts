import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, direction: FiveNoPgBuilder.OrderDirections = 'ASC'): FiveNoPgBuilder.Operations {
  if (!this.state.order) {
    this.state.order = []
  }

  this.state.order.push({ field: this.helpers.field(field), direction: direction.toUpperCase() })

  return this.operations
}
