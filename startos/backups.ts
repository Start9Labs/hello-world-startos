import { sdk } from './sdk'

/**
 * Here we define which volumes to back up, including advanced options.
 */

/**
 * This example backs up the entire "main" volume.
 */
export const { createBackup, restoreBackup } = sdk.setupBackups('main')

/**
 * This example backs up the "main" volume, but excludes a hypothetical directory called "excludedDir".
 */
// export const { createBackup, restoreBackup } = sdk.setupBackups(
//   sdk.Backups.volumes('main').setOptions({
//     exclude: ['path/to/excludedDir'],
//   }),
// )
