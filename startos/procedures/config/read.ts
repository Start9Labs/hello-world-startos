import { Store } from '../../store'
import { ConfigSpec } from './spec'
import { Read } from '@start9labs/start-sdk/lib/config/setupConfig'

/**
 * This function executes on config get
 *
 * Use this function to gather data from various files and assemble into a valid config to display to the user
 */
export const read: Read<Store, ConfigSpec> = async ({ effects, utils }) => {
  return utils.store.getOwn('/config').once()
}
