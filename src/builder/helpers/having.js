export default function() {
  let having = []

  if (this.state.having) {
    this.state.having.forEach((havingData) => {
      const fieldName = `${havingData.table}.${havingData.name}`
      let row = `${fieldName}`

      if (havingData.function) {
        row = `${havingData.function}(${fieldName})`
      }

      having.push(`${row} ${havingData.operator} ${havingData.boundValue}`)
    })

    return `HAVING ${having.join(' AND ')}`
  }

  return null
}
