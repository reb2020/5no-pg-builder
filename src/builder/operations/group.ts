import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string>): FiveNoPgBuilder.Operations {
  if (!this.state.group) {
    this.state.group = []
  }

  fields.forEach((field) => {
    this.state.group.push(this.helpers.field(field))
  })

  return this.operations
}
