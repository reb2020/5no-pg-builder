import pg from 'pg'
import { DATABASE_QUERY_LOG } from './env'

const query = <R>(pool: pg.Pool, q: string, valuesIn?: Array<string>) => {
  const values = valuesIn ?? []
  if (DATABASE_QUERY_LOG) {
    process.stdout.write('SQL: ' + q + ' with values ' + values.join(',') + '\n')
  }
  return pool.query<R>(q, values)
}

export default query
