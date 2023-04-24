import { manifest } from '../manifest'
import { initializeActions } from './actions'
import { setupMigrations } from 'start-sdk/lib/migrations/setupMigrations'

export const { init, uninit } = setupMigrations(
  manifest,
  initializeActions /*, ...,migrationsGoHere */,
)
