import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string> = []): FiveNoPgBuilder.Operations {
  if (this.state.conflict) {
    this.state.conflict.method = 'UPDATE'
    this.state.conflict.updateFields = fields
  }

  return this.operations
}
