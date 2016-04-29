'use strict'

const PREFIX = 'CC'

const ENV_VARS = [
  'PORT'
, 'JOOMLA_URL'
, 'DB_HOST'
, 'DB_USER'
, 'DB_PASSWORD'
, 'DB_DATABASE'
]

function checkEnvVar(key) {
  const fullKey = `${PREFIX}_${key}`
  const value = process.env[fullKey]

  if (!value) {
    throw new Error(`Missing ${fullKey}`)
  }

  exports[key] = value
}

ENV_VARS.forEach(checkEnvVar)
