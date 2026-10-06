import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.0.0:9',
  releaseNotes: {
    en_US: 'StartOS package improvements; no change to Hello World.',
    es_ES: 'Mejoras en el paquete de StartOS; sin cambios en Hello World.',
    de_DE: 'Verbesserungen am StartOS-Paket; keine Änderungen an Hello World.',
    pl_PL: 'Ulepszenia pakietu StartOS; bez zmian w Hello World.',
    fr_FR:
      'Améliorations du paquet StartOS ; aucun changement pour Hello World.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
