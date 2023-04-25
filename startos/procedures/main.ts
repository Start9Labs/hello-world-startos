import { HealthReceipt } from 'start-sdk/lib/health'
import { checkPortListening } from 'start-sdk/lib/health/checkFns'
import {
  Daemons,
  NetworkInterfaceBuilder,
  setupMain,
} from 'start-sdk/lib/mainFn'
import exportInterfaces from 'start-sdk/lib/mainFn/exportInterfaces'
import { ExpectedExports } from 'start-sdk/lib/types'
import { WrapperData } from '../wrapperData'

export const main: ExpectedExports.main = setupMain<WrapperData>(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */
    await effects.runCommand('echo starting Hello World!')

    /**
     * ======================== Interfaces ========================
     *
     * In this section, you will decide how the service will be exposed to the outside world
     *
     * Naming convention reference: https://developer.mozilla.org/en-US/docs/Web/API/Location
     */

    // ------------ Network Builder ------------

    // ------------ Tor ------------

    // Find or generate a random Tor hostname by ID
    const torHostname1 = utils.torHostName('torHostname1')

    // Create a Tor host with the assigned port mapping
    const torHost1 = await torHostname1.bindTor(8080, 80)
    // Assign the Tor host a web protocol (e.g. "http", "ws")
    const torOrigin1 = torHost1.createOrigin('http')

    // Create another Tor host with the assigned port mapping
    const torHost2 = await torHostname1.bindTor(8080, 443)
    // Assign the Tor host a web protocol (e.g. "https", "wss")
    const torOrigin2 = torHost2.createOrigin('https')

    // ------------ LAN ------------

    // Find or generate a random port by ID
    const lanPort1 = utils.localPort('lanPort1')
    // Create a LAN host with the assigned internal port
    const lanHost1 = await lanPort1.bindLan(8080)
    // Assign the LAN host a web protocol (e.g. "https", "wss")
    const lanOrigins1 = lanHost1.createOrigins('https')

    // ------------ Interface ----------------

    // An interface is a grouping of addresses that expose the same resource (e.g. a UI or RPC API).
    // Addresses are different "routes" to the same destination

    // Define the Interface for user display and consumption
    const interface1 = new NetworkInterfaceBuilder({
      effects,
      name: 'Web UI',
      id: 'webui',
      description: 'The web interface of Hello World',
      ui: false,
      basic: null,
      path: '',
      search: {},
    })

    // Choose which origins to attach to this interface. The resulting addresses will share the attributes of the interface (name, path, search, etc)
    const addressReceipt1 = await interface1.exportAddresses([
      torOrigin1,
      torOrigin2,
      lanOrigins1.ip,
      lanOrigins1.local,
    ])

    // Export all address receipts for all interfaces to obtain interface receipt
    const interfaceReceipt = exportInterfaces(addressReceipt1)

    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define additional health checks beyond those associated with daemons
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */
    return Daemons.of({
      effects,
      started,
      interfaceReceipt, // Provide the interfaceReceipt to prove it was completed
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon({
      id: 'webui', // The ID of the daemon
      command: './hello-world', // The command to start the daemon
      ready: {
        display: {
          // Optional. If present, the health check will display to the user
          name: 'Web Interface',
          message: 'The web interface is ready',
        },
        fn: () => checkPortListening(effects, 8080, {}), // The function to run to determine the health status of the daemon
      },
    })
  },
)
