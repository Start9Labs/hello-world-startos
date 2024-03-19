import { sdk } from '../../sdk'

/**
 * This is an example migration file.
 *
 * By convention, each new version that requires a migration should receive its own file like this one.
 *
 * The resulting migration (e.g. v4_0_0_0) is exported from here, then imported into migrations/index.ts.
 */
export const v4_0_0_1 = sdk.Migration.of({
  version: '4.0.0.1',
  up: async ({ effects }) => await effects.setConfigured({ configured: false }),
  down: async ({ effects }) => {},
})
