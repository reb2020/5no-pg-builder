export default function() {
  return (typeof this.state.alias !== 'undefined' ? this.state.alias : this.state.table)
}
