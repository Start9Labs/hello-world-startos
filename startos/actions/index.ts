import { sdk } from '../sdk'
import { nameToLogs } from './nameToLogs'
import { config } from './config'

export const actions = sdk.setupActions(nameToLogs, config)
