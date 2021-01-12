import { FiveNoPgBuilder } from '../../../typings/app'

export default function({ type = 'AND', field, operator = '=', values, group = '' }: FiveNoPgBuilder.WhereData): FiveNoPgBuilder.Where {
  const boundValues: Array<string> = []

  if (values === null || typeof values === 'undefined' || typeof values !== 'object') {
    values = [values]
  }

  if (values !== null && typeof values !== 'undefined' && typeof values.builder !== 'undefined') {
    boundValues.push(`${values.builder.instance().helpers.alias()}.${values.field}`)
    values = null
  } else {
    values.forEach((value: any) => {
      boundValues.push(value === null ? 'NULL' : this.helpers.bound(value))
    })
  }

  return {
    group: group,
    type: type,
    field: field,
    table: this.helpers.alias(),
    operator: (['is', 'is not', 'in', 'between', 'not between'].includes(operator.toLowerCase()) ? operator.toUpperCase() : operator.toLowerCase()) as FiveNoPgBuilder.OperatorsTypes,
    values: values,
    boundValues: boundValues,
  }
}
