import { sdk } from '../sdk'
import { HealthReceipt } from '@start9labs/start-sdk/cjs/sdk/lib/health/HealthReceipt'
import { uiPort } from './interfaces'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup ========================
   *
   * In this section, you will fetch any resources or run any commands necessary to run the service
   */
  console.info('Starting Hello World!')

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, you will define *additional* health checks beyond those associated with daemons
   */
  const healthReceipts: HealthReceipt[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, you will create one or more daemons that define the service runtime
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user
   */
  return sdk.Daemons.of({
    effects,
    started,
    healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
  }).addDaemon('webui', {
    imageId: 'main',
    command: 'hello-world', // The command to start the daemon
    mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
    ready: {
      // If display is null, it will not be displayed to the user in the UI
      display: 'Web Interface',
      // The function to run to determine the health status of the daemon
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is not ready',
        }),
    },
    requires: [],
  })
})
