export default function(isUpdateMethod = false) {
  let joinString = []
  let index = 0

  if (this.state.join) {
    Object.keys(this.state.join).forEach((key) => {
      const joinData = this.state.join[key]

      if (isUpdateMethod === true && index === 0) {
        if (!this.state.where) {
          this.state.where = []
        }

        joinString.push(`FROM ${joinData.secondaryTable}`)

        this.state.where.push(this.helpers.whereData({
          field: joinData.primaryTableFieldName,
          operator: '=',
          values: {
            builder: joinData.builder,
            field: joinData.secondaryTableFieldName,
          },
        }))
      } else {
        switch (joinData.type) {
          case 'LEFT':
            joinString.push(`LEFT JOIN ${joinData.secondaryTable} ON ${joinData.primaryTableField} = ${joinData.secondaryTableField}`)
            break
          case 'RIGHT':
            joinString.push(`RIGHT JOIN ${joinData.secondaryTable} ON ${joinData.primaryTableField} = ${joinData.secondaryTableField}`)
            break
          case 'INNER':
            joinString.push(`INNER JOIN ${joinData.secondaryTable} ON ${joinData.primaryTableField} = ${joinData.secondaryTableField}`)
            break
        }
      }

      joinData.secondaryTableJoin.forEach((secondaryJoin) => {
        joinString.push(secondaryJoin)
      })

      joinData.secondaryTableFields.forEach((secondaryField) => {
        if (!this.state.fields) {
          this.state.fields = []
        }

        this.state.fields.push(secondaryField)
      })

      joinData.secondaryTableWhere.forEach((secondaryWhere) => {
        if (!this.state.where) {
          this.state.where = []
        }
        let boundValues = []

        secondaryWhere.values.forEach((value) => {
          boundValues.push(value === null ? 'NULL' : this.helpers.bound(value))
        })

        secondaryWhere.boundValues = boundValues

        this.state.where.push(secondaryWhere)
      })

      joinData.secondaryTableOrder.forEach((secondaryOrder) => {
        if (!this.state.order) {
          this.state.order = []
        }

        this.state.order.push(secondaryOrder)
      })

      joinData.secondaryTableGroup.forEach((secondaryGroup) => {
        if (!this.state.group) {
          this.state.group = []
        }

        this.state.group.push(secondaryGroup)
      })

      joinData.secondaryTableHaving.forEach((secondaryHaving) => {
        if (!this.state.having) {
          this.state.having = []
        }

        this.state.having.push(secondaryHaving)
      })

      index++
    })
  }

  return joinString
}
