import { sdk } from '../sdk'

/**
 * Here we define what volumes from the Manifest to include in backups
 */
export const { createBackup, restoreBackup } = sdk.setupBackups('main')

/**
 * Excluding a hypothetical directory in the "main" volume, "excludedDir", that we do not want to back up
 */
// import { Backups } from '@start9labs/start-sdk/lib/backup/Backups'
// export const { createBackup, restoreBackup } = sdk.setupBackups(
//   Backups.volumes('main').setOptions({
//     exclude: ['path/to/excludedDir'],
//   }),
// )
