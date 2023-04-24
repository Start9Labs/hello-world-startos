import { Config, Value } from 'start-sdk/lib/config/builder'
import { WrapperData } from '../../wrapperData'
import { createAction } from 'start-sdk/lib/actions/createAction'

export const inputBuilder = Config.of({
  name: Value.text({
    name: 'Name to Print',
    required: false,
    default: null,
    patterns: [],
  }),
})
const matchConfigSpec = inputBuilder.validator()
type InputSpec = typeof matchConfigSpec._TYPE

export const nameToConsole = createAction<WrapperData, InputSpec>(
  {
    name: 'Name to Console',
    description:
      'Prints the provided name to console or, if left blank, the saved name from config.',
    id: 'nameToConsole',
    input: inputBuilder.build(),
    runningOnly: false,
  },
  async ({ effects, utils, input }) => {
    const name =
      input.name || (await utils.getWrapperData('/config/name').first())
    effects.runCommand(`echo "Hello ${name}"`)
    return {
      message: `Echoed name (${name}) to console`,
      copyable: true,
      qr: false,
    }
  },
)
