export default function(fields = []) {
  if (this.state.conflict) {
    this.state.conflict.method = 'UPDATE'
    this.state.conflict.updateFields = fields
  }

  return this.operations
}
