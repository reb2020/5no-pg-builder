export default function() {
  let where = []

  if (this.state.where) {
    let whereOr = {}

    this.state.where.forEach((whereData) => {
      let whereConditional = null

      switch (whereData.operator) {
        case 'in':
          whereConditional = `${whereData.table}.${whereData.field} IN (${whereData.boundValues.join(',')})`
          break
        default:
          whereConditional = `${whereData.table}.${whereData.field} ${whereData.operator} ${whereData.boundValues.pop()}`
      }

      if (whereData.type === 'OR') {
        if (!whereOr[whereData.group]) {
          whereOr[whereData.group] = []
        }

        whereOr[whereData.group].push(whereConditional)
      } else if (whereData.type === 'AND') {
        where.push(whereConditional)
      }
    })

    const isParentheses = !!(where.length > 0 || Object.keys(whereOr).length > 1)

    Object.keys(whereOr).forEach((key) => {
      if (isParentheses) {
        where.push('(' + whereOr[key].join(' OR ') + ')')
      } else {
        where.push(whereOr[key].join(' OR '))
      }
    })

    return `WHERE ${where.join(' AND ')}`
  }

  return null
}
