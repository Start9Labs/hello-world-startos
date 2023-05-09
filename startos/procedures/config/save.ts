import { ConfigSpec } from './spec'
import { Save } from '@start9labs/start-sdk/lib/config/setupConfig'
import { Manifest } from '../../manifest'
import { Store } from '../../store'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save: Save<Store, ConfigSpec, Manifest> = async ({
  effects,
  utils,
  input,
  dependencies,
}) => {
  await utils.store.setOwn('/config', input)
  const dependenciesReceipt = await effects.setDependencies([])

  return {
    dependenciesReceipt,
    restart: true,
  }
}
