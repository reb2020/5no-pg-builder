import { FiveNoPgBuilder } from '../../../typings/app'

export default function() {
  const fields: Array<string> = []

  this.state.fields.forEach((field: FiveNoPgBuilder.Field) => {
    const fieldName = `${field.table}.${field.name}`
    let row = `${fieldName}`

    if (field.function) {
      row = `${field.function}(${fieldName})`
    }

    fields.push(`${row}${(field.alias ? ` AS ${field.alias}` : '')}`)
  })

  return fields
}
