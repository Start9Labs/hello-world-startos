import { sdk } from '../sdk'
import { yamlFile } from '../file-models/config.yml'
import { getSecretPhrase } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  name: Value.text({
    name: 'Name',
    description:
      'When you launch the Hello World UI, it will display "Hello [Name]"',
    required: { default: 'World' },
  }),
})

export const setName = sdk.Action.withInput(
  // id
  'set-name',

  // metadata
  async ({ effects }) => ({
    name: 'Set Name',
    description: 'Set your name so Hello World can say hello to you',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  ({ effects }) => yamlFile.read.const(effects),

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
