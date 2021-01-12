import { FiveNoPgBuilder } from '../../../typings/app'

export default function(): string | null {
  if (this.state.insert && this.state.conflict) {
    const { method, updateFields, fields } = this.state.conflict
    const { insert } = this.state as FiveNoPgBuilder.State
    const { field: aliasField } = this.helpers

    const returnData: Array<string> = [`ON CONFLICT (${fields.join(', ')}) DO ${method}`]

    if (method === 'UPDATE') {
      returnData.push('SET')

      let index = 0
      const where: Array<string> = []
      const setData: Array<string> = []
      insert?.fields.forEach(function(field) {
        if (updateFields.includes(field)) {
          setData.push(`${field} = ${insert.values[index]}`)
        }
        if (fields.includes(field)) {
          where.push(`${aliasField(field)} = ${insert.values[index]}`)
        }
        index++
      })

      returnData.push(setData.join(', '))
      returnData.push('WHERE')
      returnData.push(where.join(' AND '))
    }

    return returnData.join(' ')
  }

  return null
}
