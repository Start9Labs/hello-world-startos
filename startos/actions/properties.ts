import { sdk } from '../sdk'

export const properties = sdk.Action.withoutInput(
  // id
  'properties',

  // metadata
  async ({ effects }) => ({
    name: 'Properties',
    description: 'Useful information about Hello World',
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
