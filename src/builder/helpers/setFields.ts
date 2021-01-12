import { FiveNoPgBuilder } from '../../../typings/app'

export default function(fields: Array<string>): Array<FiveNoPgBuilder.Field> {
  const setFields: Array<FiveNoPgBuilder.Field> = []

  fields.forEach((fieldName) => {
    const regExp = /\(([^)]+)\)/
    let name = fieldName.trim()
    let alias = ''
    let functionName: string | null = null

    const check = name.split(' ')
    if (check.length === 3 && check[1].toLowerCase() === 'as') {
      name = check[0]
      alias = check[2]
    }

    const matches = regExp.exec(name)
    if (matches && matches[1]) {
      const functionNameCheck = name.split('(')
      name = matches[1]
      functionName = functionNameCheck[0]
    }

    setFields.push({
      name: name,
      alias: alias,
      function: functionName,
      table: this.helpers.alias(),
    })
  })

  return setFields
}
