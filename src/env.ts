import dotenv, { DotenvConfigOutput } from 'dotenv'

import { FiveNoPgBuilder } from '../typings/app'

const result: DotenvConfigOutput = dotenv.config()

if (result?.error) {
  throw result.error
}

const env: FiveNoPgBuilder.Env = {
  DATABASE_URL: '',
  DATABASE_QUERY_LOG: false,
}

if (result?.parsed) {
  const parsed = result.parsed
  Object.keys(parsed).forEach((key) => {
    const value = parsed[key]
    if (value && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
      env[key] = value === 'true'
    } else {
      env[key] = value
    }
  })
}

export const DATABASE_URL = env.DATABASE_URL
export const DATABASE_QUERY_LOG = env.DATABASE_QUERY_LOG
