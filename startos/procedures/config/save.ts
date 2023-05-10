import { configSpec } from './spec'
import { sdk } from '../../sdk'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    await utils.store.setOwn('/config', input)
    const dependenciesReceipt = await effects.setDependencies([])

    return {
      dependenciesReceipt,
      restart: true,
    }
  },
)
