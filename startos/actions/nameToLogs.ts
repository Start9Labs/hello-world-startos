import { sdk } from '../sdk'
import { yamlFile } from '../file-models/config.yml'

export const nameToLogs = sdk.Action.withoutInput(
  // id
  'name-to-logs',

  // metadata
  async ({ effects }) => ({
    name: 'Print name to Logs',
    description: 'Prints "Hello [Name]" to the service logs.',
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
    visibility: (await sdk.store
      .getOwn(effects, sdk.StorePath.nameLastUpdatedAt)
      .const())
      ? 'enabled'
      : {
          disabled: 'Cannot print name to logs until you update your name.',
        },
  }),

  // the execution function
  async ({ effects }) => {
    const name = (await yamlFile.read.const(effects))!.name
    console.info(`Hello ${name}`)

    return {
      version: '1',
      title: 'Success',
      message: `"Hello ${name}" has been logged. Open the Hello World service logs to view it.`,
      result: null,
    }
  },
)
