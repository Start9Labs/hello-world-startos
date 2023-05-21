import { sdk } from '../../sdk'
import { yamlFile } from './file-models/config.yml'
import { configSpec } from './spec'

/**
 * This function executes on config get
 *
 * Use this function to gather data from various files and assemble into a valid config to display to the user
 */
export const read = sdk.setupConfigRead(
  configSpec,
  async ({ effects, utils }) => {
    // Retrieve data from the service's native config file. So, even if the user changes this file from the service's GUI or from the command line, the StartOS config will update as well.
    const configYml = await yamlFile.read(effects)
    // Return the expected config spec to display to the user
    return {
      name: configYml?.name || '',
    }
  },
)
