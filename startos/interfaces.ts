import { sdk } from './sdk'
import { configSpec } from './config/spec'

export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, input }) => {
    const uiMulti = sdk.host.multi(effects, 'ui-multi')
    const uiMultiOrigin = await uiMulti.bindPort(80, {
      protocol: 'http',
    })
    const ui = sdk.createInterface(effects, {
      name: 'Web UI',
      id: 'ui',
      description: 'The web interface of Hello World',
      type: 'ui',
      hasPrimary: false,
      masked: false,
      schemeOverride: null,
      username: null,
      path: '',
      search: {},
    })

    const uiReceipt = await uiMultiOrigin.export([ui])

    return [uiReceipt]
  },
)
