import { sdk } from '../sdk'
import { getSecretPhrase } from '../utils'
import { setDependencies } from '../dependencies/dependencies'
import { setInterfaces } from '../interfaces'
import { yamlFile } from '../file-models/config.yml'
import { configSpec } from './spec'

export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, input }) => {
    await yamlFile.merge(input, effects)

    await Promise.all([
      sdk.store.setOwn(
        effects,
        sdk.StorePath.nameLastUpdatedAt,
        new Date().toISOString(),
      ),
      sdk.store.setOwn(
        effects,
        sdk.StorePath.secretPhrase,
        getSecretPhrase(input.name),
      ),
    ])

    return {
      interfacesReceipt: await setInterfaces({ effects, input }), // Plumbing. DO NOT EDIT.
      dependenciesReceipt: await setDependencies({ effects, input }), // Plumbing. DO NOT EDIT.
      restart: true,
    }
  },
)
