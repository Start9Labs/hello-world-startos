import { sdk } from '../sdk'

export const showSecretPhrase = sdk.Action.withoutInput(
  // id
  'show-secret-phrase',

  // metadata
  async ({ effects }) => ({
    name: 'Show Secret Phrase',
    description: 'Reveal the secret phrase for Hello World',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // the execution function
  async ({ effects }) => {
    return {
      version: '1',
      type: 'string',
      name: 'Secret Phrase',
      description: 'Use this phrase to gain access to extraordinary places',
      value: await sdk.store
        .getOwn(effects, sdk.StorePath.secretPhrase)
        .const(),
      copyable: true,
      qr: true,
      masked: true,
    }
  },
)
