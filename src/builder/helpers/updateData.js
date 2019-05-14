export default function(data) {
  let values = []
  let fields = []

  Object.keys(data).forEach((field) => {
    fields.push(field)
    if (data[field] !== null && typeof data[field].builder !== 'undefined') {
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
