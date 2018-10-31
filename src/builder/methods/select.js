export default function() {
  this.sql.push('SELECT')

  if (this.state.distinct) {
    this.sql.push('DISTINCT')
  }

  const joins = this.helpers.join()

  this.sql.push(this.helpers.fields().join(', '))
  this.sql.push('FROM')
  this.sql.push(this.helpers.table(true))

  joins.forEach((join) => {
    this.sql.push(join)
  })

  const where = this.helpers.where()
  if (where) {
    this.sql.push(where)
  }

  const group = this.helpers.group()
  if (group) {
    this.sql.push(group)
  }

  const having = this.helpers.having()
  if (having) {
    this.sql.push(having)
  }

  const order = this.helpers.order()
  if (order) {
    this.sql.push(order)
  }

  const limit = this.helpers.limit()
  if (limit) {
    this.sql.push(limit)
  }
}
