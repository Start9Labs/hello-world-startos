import { sdk } from '../sdk'
import { v0_3_6_0 } from './v0.3.6.0'

/**
 * Here we list every migration in sequential order.
 */
export const migrations = sdk.setupMigrations(v0_3_6_0)
