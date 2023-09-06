import { sdk } from '../sdk'
import { configSpec } from './config/spec'

export const uiPort = 80
export const webUiInterfaceId = 'webui'

/**
 * ======================== Interfaces ========================
 *
 * In this section, you will decide how the service will be exposed to the outside world
 *
 * This function runs on service install, update, and config save
 */
export const setInterfaces = sdk.setupInterfaces(
  configSpec,
  async ({ effects, utils, input }) => {
    const uiMulti = utils.host.multi('uiMulti')
    const uiMultiOrigin = await uiMulti.bindPort(uiPort, { protocol: 'http' })
    const ui = utils.createInterface({
      name: 'Web UI',
      id: webUiInterfaceId,
      description: 'The web interface of Hello World',
      type: 'ui',
      hasPrimary: false,
      disabled: false,
      username: null,
      path: '',
      search: {},
    })

    const uiReceipt = await ui.export([uiMultiOrigin])

    return [uiReceipt]
  },
)
