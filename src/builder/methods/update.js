export default function() {
  this.sql.push('UPDATE')

  this.sql.push(this.helpers.table(true))

  this.sql.push('SET')

  const update = this.helpers.update()
  if (update) {
    this.sql.push(update)
  }

  const joins = this.helpers.join({
    isUpdateMethod: true,
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
