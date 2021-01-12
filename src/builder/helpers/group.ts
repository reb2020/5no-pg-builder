export default function() {
  if (this.state.group) {
    return `GROUP BY ${this.state.group.join(', ')}`
  }

  return null
}
