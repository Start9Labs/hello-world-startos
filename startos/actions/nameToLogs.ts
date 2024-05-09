import { sdk } from '../sdk'
const { Config, Value } = sdk
import { yamlFile } from '../file-models/config.yml'

/**
 * Here we define an Action for our package.
 *
 * By convention, each Action receives its own file.
 */

/**
 * Actions optionally take arbitrary form input.
 */
const input = Config.of({
  nameToPrint: Value.text({
    name: 'Temp Name',
    description: 'If no name is provided, the name from config will be used',
    required: false,
  }),
})

/**
 * This function defines the Action, including the optional form input.
 */

export const nameToLogs = sdk.createDynamicAction(
  /** id */
  'nameToLogs',
  /** metadata */
  async ({ effects }) => {
    return {
      name: 'Name to Logs',
      description: 'Prints "Hello [Name]" to the service logs.',
      warning: null,
      disabled: false,
      input,
      allowedStatuses: 'onlyRunning',
      group: null,
    }
  },
  /** the execution function */
  async ({ effects, input }) => {
    const name =
      input.nameToPrint || (await yamlFile.read(effects))?.name || 'Unknown'

    console.info(`Hello ${name}`)

    return {
      message: `"Hello ${name}" has been written to the service logs. Open your logs to view it.`,
      value: {
        value: name,
        copyable: true,
        qr: false,
      },
    }
  },
  /** spec for form input */
  input,
)
