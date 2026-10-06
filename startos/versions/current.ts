import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.0.0:9',
  releaseNotes: {
    en_US: 'Internal packaging update; no change to Hello World.',
    es_ES: 'Actualización interna del paquete; sin cambios en Hello World.',
    de_DE: 'Interne Paketaktualisierung; keine Änderung an Hello World.',
    pl_PL: 'Wewnętrzna aktualizacja pakietu; bez zmian w Hello World.',
    fr_FR: 'Mise à jour interne du paquet ; aucun changement pour Hello World.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
