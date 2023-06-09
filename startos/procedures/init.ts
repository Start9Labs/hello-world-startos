import { sdk } from '../sdk'
import { getSecretPhrase } from '../utils'
import { yamlFile } from './config/file-models/config.yml'
import { setInterfaces } from './interfaces'
import { migrations } from './migrations'

/**
 * Here you define arbitrary code that runs *once*, on fresh install only
 */
const install = sdk.setupInstall(async ({ effects, utils }) => {
  const name = 'World'

  await yamlFile.write({ name }, effects)

  await utils.store.setOwn('/secretPhrase', getSecretPhrase(name))
})

/**
 * Here you define arbitrary code that runs once, on uninstall only
 */
const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

/**
 * Here you determine which values from your store, if any, should be exposed to the user or to dependent services
 *
 * Values exposed to the user should be credentials and will be displayed in the user's "Vault"
 */
const exported = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [
      {
        path: '/secretPhrase',
        title: 'Secret Phrase',
      },
    ],
    services: [
      {
        path: '/nameLastUpdatedAt',
      },
    ],
  }
})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  exported,
)
