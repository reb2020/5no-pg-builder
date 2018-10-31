import { DATABASE_QUERY_LOG } from './env'

const query = (pool, q, valuesIn) => {
  const values = valuesIn || []
  if (DATABASE_QUERY_LOG) {
    process.stdout.write('SQL: ' + q + ' with values ' + values.join(',') + '\n')
  }
  return pool.query(q, values)
}

export default query
