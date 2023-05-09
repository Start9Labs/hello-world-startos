import { StartSdk } from '@start9labs/start-sdk/lib/StartSdk'
import { manifest } from '../manifest'
import { Store } from '../store'

export const sdk = StartSdk.of()
  .withManifest(manifest)
  .withStore<Store>()
  .build(true)
