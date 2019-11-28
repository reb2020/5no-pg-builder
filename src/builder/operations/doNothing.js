export default function() {
  if (this.state.conflict) {
    this.state.conflict.method = 'NOTHING'
    this.state.conflict.updateFields = null
  }

  return this.operations
}
