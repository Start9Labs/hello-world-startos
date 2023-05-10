import { configSpec } from './spec'
import { read } from './read'
import { save } from './save'
import { sdk } from '../../sdk'

/**
 * This is a static file. There is no need to make changes here
 */
export const { getConfig, setConfig } = sdk.setupConfig(configSpec, save, read)
