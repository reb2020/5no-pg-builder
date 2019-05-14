export default function({ type = 'AND', field, operator = '=', values, group = null }) {
  let boundValues = []

  if (values === null || typeof values === 'undefined' || typeof values !== 'object') {
    values = [values]
  }

  if (values !== null && typeof values.builder !== 'undefined') {
    boundValues.push(`${values.builder.instance().helpers.alias()}.${values.field}`)
    values = null
  } else {
    values.forEach((value) => {
      boundValues.push(value === null ? 'NULL' : this.helpers.bound(value))
    })
  }

  return {
    group: group,
    type: type,
    field: field,
    table: this.helpers.alias(),
    operator: ['is', 'is not'].includes(operator.toLowerCase()) ? operator.toUpperCase() : operator.toLowerCase(),
    values: values,
    boundValues: boundValues,
  }
}
