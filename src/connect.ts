import Pool from 'pg-pool'
import url from 'url'

import { FiveNoPgBuilder } from '../typings/app'
import { DATABASE_URL } from './env'

if (!DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL is not set')
}

const params = new url.URL(DATABASE_URL)

const config: FiveNoPgBuilder.Config = {
  user: params?.username?.split(':')[0],
  password: params?.username?.split(':')[1],
  host: params.hostname ?? '127.0.0.1',
  port: Number(params.port ?? 5432),
  database: params?.pathname?.split('/')[1],
  ssl: true,
}

Object.keys(params.searchParams).forEach((key) => {
  const value = params.searchParams[key]
  if (value && typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    config[key] = value === 'true'
  } else if (value && Number(value).toString() === value) {
    config[key] = Number(value)
  } else {
    config[key] = value
  }
})

export default new Pool(config)
