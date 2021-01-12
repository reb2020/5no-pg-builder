import { FiveNoPgBuilder } from '../../../typings/app'

export default function(schema: string): FiveNoPgBuilder.Operations {
  this.state.schema = schema

  return this.operations
}
