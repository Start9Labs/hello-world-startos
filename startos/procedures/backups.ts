import { setupBackups } from "start-sdk/lib/backup";

/**
 * Here we define what volumes to include in backups
 */
export const { createBackup, restoreBackup } = setupBackups<Manifest>("main")