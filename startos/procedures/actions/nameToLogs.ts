import { sdk } from '../../sdk'
const { Config, Value } = sdk
import { yamlFile } from '../config/file-models/config.yml'

/**
 * This is an example Action
 *
 * By convention, each action receives its own file
 *
 * Actions optionally take an arbitrary config form as input
 */
const input = Config.of({
  nameToPrint: Value.text({
    name: 'Temp Name',
    description: 'If no name is provided, the name from config will be used',
    required: false,
  }),
})

/**
 * This function defines the Action, including the FormSpec (if any)
 *
 * The first argument is the Action metadata. The second argument is the Action function
 *
 * If no input is required, FormSpec would be null
 */
export const nameToLogs = sdk.createAction(
  {
    name: 'Name to Logs',
    description: 'Prints "Hello [Name]" to the service logs.',
    id: 'nameToLogs',
    input,
    allowedStatuses: 'only-running',
  },
  async ({ effects, utils, input }) => {
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
)
