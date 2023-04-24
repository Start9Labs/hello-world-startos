import { InputSpec } from './inputSpec'
import { WrapperData } from '../../wrapperData'
import { Save } from 'start-sdk/lib/config/setupConfig'

/**
 * Use this function to persist config data to various files and to establish current dependencies
 */

export const save: Save<WrapperData, InputSpec> = async ({
  effects,
  utils,
  input,
}) => {
  await utils.setWrapperData('/config', input)
  return effects.setDependencies([])
}
