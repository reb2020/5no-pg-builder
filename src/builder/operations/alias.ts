import { FiveNoPgBuilder } from '../../../typings/app'

export default function(alias: string): FiveNoPgBuilder.Operations {
  this.state.alias = alias
  return this.operations
}
