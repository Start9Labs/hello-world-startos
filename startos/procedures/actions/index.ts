import { sdk } from '../../sdk'
import { nameToLogs } from './nameToLogs'

/**
 * Add each new Action as the next argument to this function
 */
export const { actions, actionsMetadata } = sdk.setupActions(nameToLogs)
