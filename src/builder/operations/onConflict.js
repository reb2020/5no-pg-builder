export default function(fields = []) {
  if (!this.state.conflict) {
    this.state.conflict = {
      fields: fields,
      updateFields: null,
      method: null,
    }
  }

  return this.operations
}
