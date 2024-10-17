import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { setName } from '../actions/setName'

export const v0360 = VersionInfo.of({
  version: '0.3.6:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      await sdk.action.requestOwn(effects, setName, 'critical')
    },
    down: IMPOSSIBLE,
  },
})
