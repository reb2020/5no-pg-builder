import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string> = ['*']): FiveNoPgBuilder.Operations {
  this.state.returning = fields

  return this.operations
}
