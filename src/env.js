import dotenv from 'dotenv'

const result = dotenv.config()

if (result.error) {
  throw result.error
}

let env = {}

Object.keys(result.parsed).forEach((key) => {
  const value = result.parsed[key]
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    env[key] = value === 'true'
  } else if (!isNaN(value)) {
    env[key] = Number(value)
  } else {
    env[key] = value
  }
})

module.exports = env
