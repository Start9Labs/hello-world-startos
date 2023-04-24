import { InputSpec } from './inputSpec'
import { WrapperData } from '../../wrapperData'
import { Read } from 'start-sdk/lib/config/setupConfig'

/**
 * This function executes on config fetch
 *
 * Use this function to gather data from various files and assemble into a valid config
 */

export const read: Read<WrapperData, InputSpec> = async ({ utils }) => {
  return utils.getWrapperData('/config').first()
}
