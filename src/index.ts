import Pool from './connect'
import Query from './query'
import Builder from './builder'

import { FiveNoPgBuilder } from '../typings/app'

class Manager {
    query = <R>(q: string, valuesIn?: Array<string>) => Query<R>(Pool, q, valuesIn)

    build = ({ table, schema = 'public', alias, rowsHandler }: FiveNoPgBuilder.Build) => {
      const builder = new Builder(this.query)

      builder.operations.table(table)
      builder.operations.schema(schema)
      builder.operations.alias(alias)

      if (rowsHandler) {
        builder.rowsHandler = rowsHandler
      }

      return builder.operations
    }

    begin = () => this.query('BEGIN')

    commit = () => this.query('COMMIT')

    rollback = () => this.query('ROLLBACK')
}

export default new Manager()
