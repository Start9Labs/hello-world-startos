import { sdk } from '../sdk'
import { v4_0_0_1 } from './v4_0_0_1'

/**
 * Here we list every migration in sequential order.
 */
export const migrations = sdk.setupMigrations(v4_0_0_1)
