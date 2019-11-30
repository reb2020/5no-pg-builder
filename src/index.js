import Pool from './connect'
import Query from './query'
import Builder from './builder'

class Manager {
    query = (q, valuesIn) => Query(Pool, q, valuesIn)

    build = ({table, schema = 'public', alias, rowsHandler}) => {
      const builder = new Builder(this.query)

      builder.operations.table(table)
      builder.operations.schema(schema)
      builder.operations.alias(alias)

      if (rowsHandler) {
        builder.rowsHandler = rowsHandler
      }

      return builder.operations
    }

    begin = () => {
      return this.query('BEGIN')
    }

    commit = () => {
      return this.query('COMMIT')
    }

    rollback = () => {
      return this.query('ROLLBACK')
    }
}

module.exports = new Manager()
