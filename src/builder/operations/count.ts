import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string): FiveNoPgBuilder.Operations {
  this.state.method = 'count'
  if (field) {
    this.state.fields = this.helpers.setFields([field])
  }
  return this.operations
}
