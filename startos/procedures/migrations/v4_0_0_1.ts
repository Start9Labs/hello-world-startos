import { Migration } from '@start9labs/start-sdk/lib/inits/migrations/Migration'
import { wrapperDataContract } from '../../wrapperData'

/**
 * This is an example migration file
 *
 * By convention, each version service requiring a migration receives its own file
 *
 * The resulting migration (e.g. v4000) is exported, then imported into migration/index.ts
 */
export const v4_0_0_1 = new Migration(wrapperDataContract, {
  version: '4.0.0.1',
  up: async ({ effects }) => await effects.setConfigured(false),
  down: async ({ effects }) => {},
})
