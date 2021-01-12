import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): string | null {
  const where: Array<string> = []

  if (this.state?.where) {
    const whereOr = {}

    this.state.where.forEach((whereData: FiveNoPgBuilder.Where) => {
      let whereConditional = ''

      switch (whereData.operator) {
        case 'IN':
          whereConditional = `${whereData.table}.${whereData.field} ${whereData.operator} (${whereData.boundValues.join(',')})`
          break
        case 'BETWEEN':
          whereConditional = `${whereData.table}.${whereData.field} ${whereData.operator} ${whereData.boundValues.join(' AND ')}`
          break
        case 'NOT BETWEEN':
          whereConditional = `${whereData.table}.${whereData.field} ${whereData.operator} ${whereData.boundValues.join(' AND ')}`
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
