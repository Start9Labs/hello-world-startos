import { setupMigrations } from '@start9labs/start-sdk/lib/inits/migrations/setupMigrations'
import { manifest } from '../../manifest'
import { v4_0_0 } from './v4_0_0'

/**
 * Add each new migration as the next argument to this function
 */
export const migrations = setupMigrations(manifest, v4_0_0)
