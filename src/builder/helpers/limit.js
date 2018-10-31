export default function() {
  if (this.state.limit) {
    let limit = `LIMIT ${this.state.limit.limit}`
    if (this.state.limit.offset) {
      limit = limit + ` OFFSET ${this.state.limit.offset}`
    }
    return limit
  }

  return null
}
