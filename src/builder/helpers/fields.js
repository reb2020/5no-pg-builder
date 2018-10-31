export default function() {
  let fields = []

  this.state.fields.forEach((field) => {
    const fieldName = `${field.table}.${field.name}`
    let row = `${fieldName}`

    if (field.function) {
      row = `${field.function}(${fieldName})`
    }

    fields.push(`${row}${(field.alias ? ` AS ${field.alias}` : '')}`)
  })

  return fields
}
