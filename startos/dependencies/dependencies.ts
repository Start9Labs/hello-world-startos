import { sdk } from '../sdk'

/**
 * ======================== Dependencies ========================
 *
 * Here we determine which
 *
 * This function runs on install, update, and config save.
 */
export const setDependencies = sdk.setupDependencies(
  async ({ effects, input }) => ({}),
)
