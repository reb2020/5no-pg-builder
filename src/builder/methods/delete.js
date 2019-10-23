export default function() {
  this.sql.push('DELETE')
  this.sql.push('FROM')

  this.sql.push(this.helpers.table(true))

  const joins = this.helpers.join({
    isDeleteMethod: true,
  })

  joins.forEach((join) => {
    this.sql.push(join)
  })

  const where = this.helpers.where()
  if (where) {
    this.sql.push(where)
  }

  const returning = this.helpers.returning(true)
  if (returning) {
    this.sql.push('RETURNING')
    this.sql.push(returning)
  }
}
