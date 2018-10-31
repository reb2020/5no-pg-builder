export default function(data) {
  this.state.method = 'update'
  this.state.update = this.helpers.updateData(data)

  return this.operations
}
