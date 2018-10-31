import Pool from './connect'
import Query from './query'
import Builder from './builder'

class Manager {
    query = (q, valuesIn) => Query(Pool, q, valuesIn)

    build = ({table, schema = 'public', alias}) => {
      const builder = new Builder(this.query)

      builder.operations.table(table)
      builder.operations.schema(schema)
      builder.operations.alias(alias)

      return builder.operations
    }
}

module.exports = new Manager()
