import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, values: any): FiveNoPgBuilder.Operations {
  this.operations.where(field, 'IN', values)

  return this.operations
}
