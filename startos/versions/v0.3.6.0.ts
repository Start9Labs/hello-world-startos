import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'

export const v0360 = VersionInfo.of({
  version: '0.3.6:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
