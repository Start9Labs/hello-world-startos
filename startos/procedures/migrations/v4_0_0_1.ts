import { sdk } from '../../sdk'

/**
 * This is an example migration file
 *
 * By convention, each version service requiring a migration receives its own file
 *
 * The resulting migration (e.g. v4_0_0_0) is exported, then imported into migrations/index.ts
 */
export const v4_0_0_1 = sdk.Migration.of({
  version: '4.0.0.1',
  up: async ({ effects, utils }) => await effects.setConfigured(false),
  down: async ({ effects, utils }) => {},
})
