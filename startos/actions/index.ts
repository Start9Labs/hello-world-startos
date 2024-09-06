import { sdk } from '../sdk'
import { nameToLogs } from './nameToLogs'

export const { actions, actionsMetadata } = sdk.setupActions(nameToLogs)
