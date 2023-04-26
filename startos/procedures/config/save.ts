import { ConfigSpec } from './spec'
import { WrapperData } from '../../wrapperData'
import { Save } from 'start-sdk/lib/config/setupConfig'

/**
 * This function executes on config save
 * 
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save: Save<WrapperData, ConfigSpec, Manifest> = async ({
  effects,
  utils,
  input,
  dependencies,
}) => {
  await utils.setWrapperData('/config', input)
  return effects.setDependencies([])
}
