import { sdk } from '../sdk'

/**
 * ======================== Dependencies ========================
 *
 * Here we determine your service's dependencies.
 *
 * This function runs on install, update, and config save.
 *
 * See Hello Moon for an example
 */
export const setDependencies = sdk.setupDependencies(
  async ({ effects, input }) => ({}),
)
