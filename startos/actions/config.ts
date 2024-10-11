import { sdk } from '../sdk'
const { InputSpec, Value } = sdk
import { yamlFile } from '../file-models/config.yml'
import { getSecretPhrase } from '../utils'

export const inputSpec = InputSpec.of({
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
  async ({ effects }) => ({
    name: 'Configure',
    description: 'edit the underlying config.yaml of Hello World',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  ({ effects }) => yamlFile.read.once(),

  // the execution function
  async ({ effects, input }) => {
    const yaml = await yamlFile.read.const(effects)

    if (yaml?.name === input.name) return

    await Promise.all([
      yamlFile.merge(input),
      sdk.store.setOwn(
        effects,
        sdk.StorePath.secretPhrase,
        getSecretPhrase(input.name),
      ),
      sdk.store.setOwn(
        effects,
        sdk.StorePath.nameLastUpdatedAt,
        new Date().toISOString(),
      ),
    ])
  },
)
