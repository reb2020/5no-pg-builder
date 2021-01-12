import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, from: any, to: any): FiveNoPgBuilder.Operations {
  this.operations.where(field, 'NOT BETWEEN', [from, to])

  return this.operations
}
