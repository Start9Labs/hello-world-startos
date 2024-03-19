import { sdk } from '../../sdk'
import { getSecretPhrase } from '../../utils'
import { setInterfaces } from '../interfaces'
import { yamlFile } from './file-models/config.yml'
import { configSpec } from './spec'

/**
 * This function executes on config save.
 *
 * Use it to persist config data to various files and to establish any resulting dependencies.
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, input, dependencies }) => {
    /**
     ******** save data wherever you want ********
     */
    // Whenever possible, save data directly to the underlying config file(s) of the upstream service.
    // This ensures that changes to the file from the service's GUI or from the command line are respected.
    await yamlFile.write(input, effects)
    // If necessary, save package specific data to the package Store. Stateless packages are preferable.
    await Promise.all([
      sdk.store.setOwn(effects, '/nameLastUpdatedAt', new Date().toISOString()),
      sdk.store.setOwn(effects, '/secretPhrase', getSecretPhrase(input.name)),
    ])

    /**
     ******** set current dependencies based on config ********
     */
    const dependenciesReceipt = await effects.setDependencies({
      dependencies: [],
    })

    return {
      interfacesReceipt: await setInterfaces({ effects, input }), // Plumbing. DO NOT EDIT. This line causes setInterfaces() to run whenever config is saved.
      dependenciesReceipt, // Plumbing. DO NOT EDIT.
      restart: true, // optionally restart the service on config save.
    }
  },
)
