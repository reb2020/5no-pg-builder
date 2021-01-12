import { FiveNoPgBuilder } from '../../../typings/app'

export default function(limit: number, offset: number | null = null): FiveNoPgBuilder.Operations {
  this.state.limit = {
    limit: limit,
    offset: offset,
  }

  return this.operations
}
