export default function(withAlias = false) {
  const table = this.state.schema + '.' + this.state.table
  const alias = this.helpers.alias()

  if (withAlias === true) {
    return `${table} AS ${alias}`
  }
  return table
}
