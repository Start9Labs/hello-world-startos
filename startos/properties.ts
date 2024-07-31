import { sdk } from './sdk'

/**
 * Here we determine which values to expose to the UI in Properties.
 */
export const properties = sdk.setupProperties(async ({ effects }) => {
  const store = await sdk.store.getOwn(effects, sdk.StorePath).once()

  return {
    'Secret Phrase': {
      type: 'string',
      value: store.secretPhrase,
      description: 'Use this phrase to gain access to extraordinary places',
      copyable: true,
      qr: false,
      masked: true,
    },
  }
})
