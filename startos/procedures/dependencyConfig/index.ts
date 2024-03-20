import { sdk } from '../../sdk'
import { configSpec } from '../config/spec'

/**
 * Here we list every dependency config.
 * 
 * By convention, each Dependency Config should receive its own file in the "dependencyConfig" directory.
 */
export const dependencyConfig = sdk.setupDependencyConfig(configSpec, {})
