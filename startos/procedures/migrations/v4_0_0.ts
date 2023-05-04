import { Migration } from '@start9labs/start-sdk/lib/inits/migrations/Migration'

/**
 * This is an example migration file
 *
 * By convention, each version service requiring a migration receives its own file
 *
 * The resulting migration (e.g. v4000) is exported, then imported into migration/index.ts
 */
export const v4_0_0 = new Migration({
  version: '4.0.0',
  up: async ({ effects }) => await effects.setConfigured(false),
  down: async ({ effects }) => {},
})
