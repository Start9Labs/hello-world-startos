import { sdk } from '../sdk'
import { getSecretPhrase } from '../utils'
import { yamlFile } from './config/file-models/config.yml'
import { setInterfaces } from './interfaces'
import { migrations } from './migrations'

/**
 * Here you define arbitrary code that runs *once*, on fresh install only.
 */
const install = sdk.setupInstall(async ({ effects }) => {
  const name = 'World'

  await yamlFile.write({ name }, effects)

  await sdk.store.setOwn(effects, '/secretPhrase', getSecretPhrase(name))
})

/**
 * Here we define arbitrary code that runs once, on uninstall only.
 */
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Here we determine which values from the store, if any, should be exposed to the UI, or to dependent services, or both.
 */
const exported = sdk.setupExports(({ effects }) => {
  return {
    /** Values exported to the UI are displayed in "Properties" according to the structure defined here. */
    ui: {
      'Secret Phrase': {
        type: 'string',
        path: '/secretPhrase',
        copyable: true,
        qr: false,
        masked: true,
      },
    },
    services: {
      paths: ['/nameLastUpdatedAt'],
    },
  }
})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  exported,
)
