import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_2_0_0_5 = VersionInfo.of({
  version: '2.0.0:5',
  releaseNotes: {
    en_US: `- Updated to start-sdk 1.5.0.
- Rewrote the in-app instructions.`,
    es_ES: `- Actualizado a start-sdk 1.5.0.
- Se reescribieron las instrucciones de la aplicación.`,
    de_DE: `- Aktualisierung auf start-sdk 1.5.0.
- In-App-Anleitung neu geschrieben.`,
    pl_PL: `- Zaktualizowano do start-sdk 1.5.0.
- Przepisano instrukcje w aplikacji.`,
    fr_FR: `- Mise à jour vers start-sdk 1.5.0.
- Réécriture des instructions intégrées.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
