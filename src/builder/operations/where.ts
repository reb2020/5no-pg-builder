import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, operator: string = '=', value: any): FiveNoPgBuilder.Operations {
  if (!this.state.where) {
    this.state.where = []
  }

  this.state.where.push(this.helpers.whereData({
    field: field,
    operator: operator,
    values: value,
  }))

  return this.operations
}
