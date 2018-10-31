export default function() {
  if (this.state.update) {
    let data = []
    let index = 0

    this.state.update.fields.forEach((field) => {
      data.push(`${field} = ${this.state.update.values[index]}`)
      index++
    })

    return data.join(', ')
  }

  return null
}
