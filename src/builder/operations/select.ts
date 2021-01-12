import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string> = ['*']): FiveNoPgBuilder.Operations {
  this.state.method = 'select'
  this.state.fields = this.helpers.setFields(fields)

  return this.operations
}
