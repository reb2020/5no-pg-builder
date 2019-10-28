import Pool from 'pg-pool'
import url from 'url'

import { DATABASE_URL } from './env'

if (!DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL is not set')
}

const params = url.parse(DATABASE_URL, true)

const auth = params.auth.split(':')

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true,
  idleTimeoutMillis: 30000,
}

Object.keys(params.query).forEach((key) => {
  const value = params.query[key]
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    config[key] = value === 'true'
  } else if (!isNaN(value)) {
    config[key] = Number(value)
  } else {
    config[key] = value
  }
})

export default new Pool(config)
