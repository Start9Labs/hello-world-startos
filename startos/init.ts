import { sdk } from './sdk'
import { exposedStore } from './store'
import { getSecretPhrase } from './utils'
import { yamlFile } from './file-models/config.yml'
import { setDependencies } from './dependencies/dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  const name = 'World'

  await yamlFile.merge({ name }, effects)

  await sdk.store.setOwn(
    effects,
    sdk.StorePath.secretPhrase,
    getSecretPhrase(name),
  )
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { init, uninit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  exposedStore,
)
