export default function({ field, operator = '=', value }) {
  const fieldData = this.helpers.setFields([field])

  return {
    ...fieldData[0],
    operator: operator.toLowerCase(),
    value: value,
    boundValue: this.helpers.bound(value),
  }
}
