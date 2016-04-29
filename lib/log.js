'use strict'

const PREFIX = 'cc'

const debug = require('debug')

const SUBSYSTEMS = [
  'httpServer'
]

function registerSubsystem(subsystem) {
  exports[subsystem] = debug(`${PREFIX}:subsystem`)
}

SUBSYSTEMS.forEach(registerSubsystem)
