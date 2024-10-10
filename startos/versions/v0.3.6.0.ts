import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { config } from '../actions/config'
import { yamlFile } from '../file-models/config.yml'

export const v0360 = VersionInfo.of({
  version: '0.3.6:0',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      const yaml = (await yamlFile.read.const(effects))!
      await sdk.action.requestOwn(effects, config, 'critical', {
        input: { kind: 'partial', value: yaml },
      })
    },
    down: IMPOSSIBLE,
  },
})
