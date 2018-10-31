export default function(data) {
  this.state.method = 'insert'
  this.state.insert = this.helpers.insertData(data)

  return this.operations
}
