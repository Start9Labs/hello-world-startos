import { sdk } from '../sdk'
import { nameToLogs } from './nameToLogs'
import { setupActions } from '@start9labs/start-sdk/lib/actions/setupActions'

/**
 * Add each new Action as the next argument to this function
 */
export const { actions, actionsMetaData } = sdk.setupActions(nameToLogs)
