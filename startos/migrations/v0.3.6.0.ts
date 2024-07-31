import { sdk } from '../sdk'

/**
 * This is an example migration file.
 *
 * By convention, each new version that requires a migration should receive its own file like this one.
 *
 * The resulting migration (e.g. v0_3_6_0) is exported from here, then imported into migrations/index.ts.
 */
export const v0_3_6_0 = sdk.Migration.of({
  version: '0.3.6:0',
  up: async ({ effects }) => await effects.setConfigured({ configured: false }),
  down: async ({ effects }) => {},
})
