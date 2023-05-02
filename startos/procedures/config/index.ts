import { WrapperData } from '../../wrapperData'
import { configSpec } from './spec'
import { read } from './read'
import { save } from './save'
import { setupConfig } from 'start-sdk/lib/config'
import { Manifest } from '../../manifest'

/**
 * This is a static file. There is no need to make changes here
 */
export const { getConfig, setConfig } = setupConfig<
  WrapperData,
  typeof configSpec,
  Manifest
>(configSpec, save, read)
