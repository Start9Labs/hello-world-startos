import { nameToLogs } from './nameToLogs'
import { setupActions } from 'start-sdk/lib/actions/setupActions'

/**
 * Add each new Action as the next argument to this function
 */
export const { actions, actionsMetadata } = setupActions(nameToLogs)
