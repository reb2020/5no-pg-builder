import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): FiveNoPgBuilder.Operations {
  if (this.state.conflict) {
    this.state.conflict.method = 'NOTHING'
    this.state.conflict.updateFields = null
  }

  return this.operations
}
