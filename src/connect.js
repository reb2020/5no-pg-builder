import Pool from 'pg-pool'
import url from 'url'

import { DATABASE_URL, DATABASE_SSL } from './env'

if (!DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL is not set')
}

const params = url.parse(DATABASE_URL)

const auth = params.auth.split(':')

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: DATABASE_SSL,
  idleTimeoutMillis: 30000,
}

export default new Pool(config)
