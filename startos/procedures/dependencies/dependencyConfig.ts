import { sdk } from '../../sdk'
import { configSpec } from '../config/spec'

/**
 * Here we establish rules for auto configuring service dependencies. See Hello Moon for an example
 */
export const dependencyConfig = sdk.setupDependencyConfig(configSpec, {})
