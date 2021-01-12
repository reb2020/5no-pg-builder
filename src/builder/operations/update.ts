import { FiveNoPgBuilder } from '../../../typings/app'

export default function(data: FiveNoPgBuilder.UpdateData): FiveNoPgBuilder.Operations {
  this.state.method = 'update'
  this.state.update = this.helpers.updateData(data)

  return this.operations
}
