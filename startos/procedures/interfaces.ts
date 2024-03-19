import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 80

/**
 * ======================== Service Interfaces ========================
 *
 * Here we decide how the service will be exposed to the outside world.
 *
 * This function runs on install, update, and config save.
 */
export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, input }) => {
    const uiMulti = sdk.host.multi(effects, 'uiMulti')
    const uiMultiOrigin = await uiMulti.bindPort(uiPort, { protocol: 'http' })
    const ui = sdk.createInterface(effects, {
      name: 'Web UI',
      id: 'webui',
      description: 'The web interface of Hello World',
      type: 'ui',
      hasPrimary: false,
      disabled: false,
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
