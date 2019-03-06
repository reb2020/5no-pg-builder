export default function({ type = 'AND', field, operator = '=', values, group = null }) {
  let boundValues = []

  if (typeof values === 'undefined' || typeof values !== 'object') {
    values = [values]
  }

  if (typeof values.builder !== 'undefined') {
    boundValues.push(`${values.builder.instance().helpers.alias()}.${values.field}`)
    values = null
  } else {
    values.forEach((value) => {
      boundValues.push(this.helpers.bound(value))
    })
  }

  return {
    group: group,
    type: type,
    field: field,
    table: this.helpers.alias(),
    operator: operator.toLowerCase(),
    values: values,
    boundValues: boundValues,
  }
}
