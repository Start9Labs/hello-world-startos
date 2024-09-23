import { sdk } from '../sdk'
const { InputSpec, Value } = sdk
import { yamlFile } from '../file-models/config.yml'

export const input = InputSpec.of({
  name: Value.text({
    name: 'Name',
    description:
      'When you launch the Hello World UI, it will display "Hello [Name]"',
    required: { default: 'World' },
  }),
})

export const config = sdk.Action.withInput(
  // id
  'config',

  // metadata
  {
    name: 'Configure',
    description: 'edit the underlying config.yaml of Hello World',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },

  // spec for form input
  input,

  // optionally pre-fill the input form
  ({ effects }) => yamlFile.read(),

  // the execution function
  async ({ effects, input }) => {
    await yamlFile.merge(input)
    return null
  },
)
