import { Backups } from "../deps.ts";

export const { createBackup, restoreBackup } = Backups.volumes("main").build();
