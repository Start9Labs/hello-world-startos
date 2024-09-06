import { sdk } from './sdk'

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
