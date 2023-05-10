import { sdk } from '../sdk'
/**
 * Here we define what volumes from the Manifest to include in backups
 */
export const { createBackup, restoreBackup } = sdk.setupBackups('main')
