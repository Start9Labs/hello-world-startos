import { sdk } from '../sdk'
import { yamlFile } from '../file-models/config.yml'
import { configSpec } from './spec'

export const read = sdk.setupConfigRead(configSpec, async ({ effects }) => {
  const configYml = await yamlFile.read(effects)

  return {
    name: configYml?.name || '',
  }
})
