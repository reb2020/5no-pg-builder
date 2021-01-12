import { FiveNoPgBuilder } from '../../../typings/app'

export default function(table: string): FiveNoPgBuilder.Operations {
  this.state.table = table

  return this.operations
}
