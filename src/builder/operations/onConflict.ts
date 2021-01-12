import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string> = []): FiveNoPgBuilder.Operations {
  if (!this.state.conflict) {
    this.state.conflict = {
      fields: fields,
      updateFields: null,
      method: null,
    }
  }

  return this.operations
}
