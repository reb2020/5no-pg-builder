import { FiveNoPgBuilder } from '../../../typings/app'

export default function(field: string, operator: string = '=', value: any, group: string = ''): FiveNoPgBuilder.Operations {
  if (!this.state.where) {
    this.state.where = []
  }

  this.state.where.push(this.helpers.whereData({
    type: 'OR',
    group: `group_or_${group}`,
    field: field,
    operator: operator,
    values: value,
  }))

  return this.operations
}
