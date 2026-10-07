import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * Fetch any resources or run any preliminary commands here.
   */
  console.info(i18n('Starting Hello World!'))

  /**
   * ======================== Daemons ========================
   *
   * Define one or more daemons that make up the service runtime. Each daemon
   * declares a `ready` health check, run on every polling interval, that reports
   * its state to the user.
   */
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'hello-world' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      }),
      'hello-world-sub',
    ),
    exec: { command: ['hello-world'] },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
