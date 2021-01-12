import { FiveNoPgBuilder } from '../../../typings/app'

export default function(data: FiveNoPgBuilder.InsertData): FiveNoPgBuilder.Operations {
  this.state.method = 'insert'
  this.state.insert = this.helpers.insertData(data)

  return this.operations
}
