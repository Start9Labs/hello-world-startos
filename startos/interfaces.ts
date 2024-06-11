import { sdk } from './sdk'
import { configSpec } from './config/spec'

// It is good practice to abstract these two variables from each interface, as they may be used elsewhere in the package codebase or by dependent packages.
export const uiPort = 80
export const webUiInterfaceId = 'webui'

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
    const uiMulti = sdk.host.multi(effects, 'ui-multi')
    const uiMultiOrigin = await uiMulti.bindPort(uiPort, { protocol: 'http' })
    const ui = sdk.createInterface(effects, {
      name: 'Web UI',
      id: webUiInterfaceId,
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
