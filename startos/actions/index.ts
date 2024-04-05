import { sdk } from '../sdk'
import { nameToLogs } from './nameToLogs'

/**
 * Here we list every Action.
 *
 * By convention, each Action should receive its own file in the "actions" directory.
 */
export const { actions, actionsMetadata } = sdk.setupActions(nameToLogs)
