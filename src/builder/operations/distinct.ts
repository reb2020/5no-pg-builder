import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): FiveNoPgBuilder.Operations {
  this.state.distinct = true
  return this.operations
}
