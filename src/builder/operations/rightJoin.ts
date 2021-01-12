import { FiveNoPgBuilder } from '../../../typings/app'

export default function(builder: FiveNoPgBuilder.Builder, primaryTableField: string, secondaryTableField: string): FiveNoPgBuilder.Operations {
  if (!this.state.join) {
    this.state.join = []
  }

  this.state.join.push(this.helpers.joinData({
    type: 'RIGHT',
    builder: builder,
    primaryTableField: primaryTableField,
    secondaryTableField: secondaryTableField,
  }))

  return this.operations
}
