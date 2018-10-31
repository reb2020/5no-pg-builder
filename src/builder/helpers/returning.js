export default function(withAlias = false) {
  if (this.state.returning) {
    let data = []

    this.state.returning.forEach((field) => {
      if (withAlias === true) {
        data.push(this.helpers.field(field))
      } else {
        data.push(field)
      }
    })

    return data.join(', ')
  }

  return null
}
