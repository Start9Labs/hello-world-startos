import { sdk } from './sdk'

export const { createBackup, restoreBackup } = sdk.setupBackups(
  sdk.Backups.volumes('main'),
)
