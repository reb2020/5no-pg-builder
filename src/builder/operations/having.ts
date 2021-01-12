import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, operator: string = '=', value: any): FiveNoPgBuilder.Operations {
  if (!this.state.having) {
    this.state.having = []
  }

  this.state.having.push(this.helpers.havingData({
    field: field,
    operator: operator,
    value: value,
  }))

  return this.operations
}
