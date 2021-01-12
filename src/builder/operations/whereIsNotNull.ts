import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string): FiveNoPgBuilder.Operations {
  this.operations.where(field, 'IS NOT', null)

  return this.operations
}
