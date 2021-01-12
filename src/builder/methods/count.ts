export default function() {
  this.sql.push('SELECT')

  const distinct = this.state.distinct ? 'DISTINCT ' : ''

  const joins = this.helpers.join()

  this.sql.push(`COUNT(${distinct}${this.helpers.fields()[0]}) AS count_rows`)
  this.sql.push('FROM')
  this.sql.push(this.helpers.table(true))

  joins.forEach((join: string) => {
    this.sql.push(join)
  })

  const where = this.helpers.where()
  if (where) {
    this.sql.push(where)
  }
}
