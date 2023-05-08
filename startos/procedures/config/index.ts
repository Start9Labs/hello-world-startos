import { WrapperData, wrapperDataContract } from '../../wrapperData'
import { configSpec } from './spec'
import { read } from './read'
import { save } from './save'
import { Manifest, manifest } from '../../manifest'
import setupConfig from '@start9labs/start-sdk/lib/config/setupConfig'

/**
 * This is a static file. There is no need to make changes here
 */
export const { getConfig, setConfig } = setupConfig(
  wrapperDataContract,
  manifest,
  configSpec,
  save,
  read,
)
