export default function() {
  this.sql.push('INSERT INTO')
  this.sql.push(this.helpers.table(true))

  const data = this.helpers.insert()

  this.sql.push(`(${data.fields})`)
  this.sql.push('VALUES')
  this.sql.push(`(${data.values})`)

  const onConflict = this.helpers.onConflict()
  if (onConflict) {
    this.sql.push(onConflict)
  }

  const returning = this.helpers.returning(true)
  if (returning) {
    this.sql.push('RETURNING')
    this.sql.push(returning)
  }
}
