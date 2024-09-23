import { sdk } from './sdk'
import { exposedStore } from './store'
import { getSecretPhrase } from './utils'
import { yamlFile } from './file-models/config.yml'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'

// **** Install ****
const install = sdk.setupInstall(async ({ effects }) => {
  const name = 'World'

  await yamlFile.merge({ name })

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
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  exposedStore,
)
