import { sdk } from '../sdk'

/**
 * Here we define what volumes from the Manifest to include in backups
 */
export const { createBackup, restoreBackup } = sdk.setupBackups('main')

/**
 * Excluding a hypothetical directory in the "main" volume, "excludedDir", that we do not want to back up
 */
// export const { createBackup, restoreBackup } = sdk.setupBackups(
//   sdk.Backups.volumes('main').setOptions({
//     exclude: ['path/to/excludedDir'],
//   }),
// )
