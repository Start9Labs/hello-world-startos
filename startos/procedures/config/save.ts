import { sdk } from '../../sdk'
import { getSecretPhrase } from '../../utils'
import { setInterfaces } from '../interfaces'
import { yamlFile } from './file-models/config.yml'
import { configSpec } from './spec'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    /**
     ******** save data wherever you want ********
     */
    // Whenever possible, save data directly to the underlying config file(s) of the upstream service.
    // This ensures that changes to the file from the service's GUI or from the command line are respected.
    await yamlFile.write(input, effects)
    // If necessary, save package specific data to the package Store. Stateless packages are preferable
    await Promise.all([
      utils.store.setOwn('/nameLastUpdatedAt', new Date().toISOString()),
      utils.store.setOwn('/secretPhrase', getSecretPhrase(input.name)),
    ])

    /**
     ******** set current dependencies based on config ********
     */
    const dependenciesReceipt = await effects.setDependencies([])

    return {
      // The line below is just plumbing, don't touch it. It insures setInterfaces runs whenever config is saved
      interfacesReceipt: await setInterfaces({ effects, utils, input }),
      // provide dependencies receipt from above
      dependenciesReceipt,
      // optionally restart the service on config save
      restart: true,
    }
  },
)
