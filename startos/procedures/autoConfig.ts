import { configSpec } from './config/spec'
import { sdk } from './sdk'

/**
 * In this function, you establish rules for auto configuring service dependencies
 *
 * See Hello Moon for an example
 */
export const autoConfig = sdk.setupAutoConfig(configSpec, {})
