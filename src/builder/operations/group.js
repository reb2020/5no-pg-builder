export default function(fields) {
  if (!this.state.group) {
    this.state.group = []
  }

  fields.forEach((field) => {
    this.state.group.push(this.helpers.field(field))
  })

  return this.operations
}
