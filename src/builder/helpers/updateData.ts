import { FiveNoPgBuilder } from '../../../typings/app'

export default function(data: FiveNoPgBuilder.UpdateData): FiveNoPgBuilder.Update {
  const values: Array<string> = []
  const fields: Array<string> = []

  Object.keys(data).forEach((field) => {
    fields.push(field)
    if (data[field] !== null && typeof data[field] !== 'undefined' && typeof data[field].builder !== 'undefined') {
      values.push(`${data[field].builder.instance().helpers.alias()}.${data[field].field}`)
    } else {
      values.push(data[field] === null ? 'NULL' : this.helpers.bound(data[field]))
    }
  })

  return {
    fields: fields,
    values: values,
  }
}
