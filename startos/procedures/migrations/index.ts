import { manifest } from '../../manifest'
import { setupMigrations } from 'start-sdk/lib/migrations/setupMigrations'
import { v4000 } from './4.0.0.0'

/**
 * Add each new migration as the next argument to this function
 */
export const { init, uninit } = setupMigrations(manifest,
  v4000,
)
