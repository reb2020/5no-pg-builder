import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string): FiveNoPgBuilder.Operations {
  this.operations.where(field, 'IS', null)

  return this.operations
}
