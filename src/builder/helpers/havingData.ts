import { FiveNoPgBuilder } from '../../../typings/app'

export default function({ field, operator = '=', value }: { field: string; operator: string; value: any; }): FiveNoPgBuilder.Having {
  const fieldData = this.helpers.setFields([field])

  return {
    ...fieldData[0],
    operator: operator.toLowerCase(),
    value: value,
    boundValue: this.helpers.bound(value),
  }
}
