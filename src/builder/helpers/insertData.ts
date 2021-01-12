import { FiveNoPgBuilder } from '../../../typings/app'

export default function(data: FiveNoPgBuilder.InsertData): FiveNoPgBuilder.Insert {
  const values: Array<string> = []
  const fields: Array<string> = []

  Object.keys(data).forEach((field) => {
    fields.push(field)
    values.push(data[field] === null ? 'NULL' : this.helpers.bound(data[field]))
  })

  return {
    fields: fields,
    values: values,
  }
}
