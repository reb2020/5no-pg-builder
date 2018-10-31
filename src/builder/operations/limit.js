export default function(limit, offset = null) {
  this.state.limit = {
    limit: limit,
    offset: offset,
  }
  return this.operations
}
