import { sdk } from './sdk'
import { exposedStore } from './store'
import { getSecretPhrase } from './utils'
import { yamlFile } from './config/file-models/config.yml'
import { setDependencies } from './dependencies/dependencies'
import { setInterfaces } from './interfaces'
import { migrations } from './migrations'

/**
 * Here you define arbitrary code that runs *once*, on fresh install only.
 */
const install = sdk.setupInstall(async ({ effects }) => {
  const name = 'World'

  await yamlFile.write({ name }, effects)

  await sdk.store.setOwn(
    effects,
    sdk.StorePath.secretPhrase,
    getSecretPhrase(name),
  )
})

/**
 * Here we define arbitrary code that runs once, on uninstall only.
 */
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  setDependencies,
  exposedStore,
)
