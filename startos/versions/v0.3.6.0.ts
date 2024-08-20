import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

/**
 * This is an example versions file.
 *
 * By convention, each new version should receive its own file like this one.
 *
 * Optionally include migrations for migrating data from one version to another.
 *
 * The resulting version (e.g. v0360) is exported from here, then imported into migrations/index.ts.
 */

export const v0360 = VersionInfo.of({
  version: '0.3.6:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      await effects.setConfigured({ configured: false })
    },
    down: IMPOSSIBLE,
  },
})
