import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): FiveNoPgBuilder.Operations {
  this.state.method = 'delete'

  return this.operations
}
