import { sdk } from '../../sdk'
import { v4_0_0_1 } from './v4_0_0_1'

/**
 * Add each new migration as the next argument to this function
 */
export const migrations = sdk.setupMigrations(v4_0_0_1)
