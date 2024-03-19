import { sdk } from '../../sdk'
import { nameToLogs } from './nameToLogs'

/**
 * Here we list every Action.
 */
export const { actions, actionsMetadata } = sdk.setupActions(nameToLogs)
