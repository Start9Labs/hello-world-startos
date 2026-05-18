import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_2_0_0_6 = VersionInfo.of({
  version: '2.0.0:6',
  releaseNotes: {
    en_US: 'Bumps start-sdk → 1.5.2.',
    es_ES: 'Actualiza start-sdk → 1.5.2.',
    de_DE: 'Aktualisiert start-sdk → 1.5.2.',
    pl_PL: 'Aktualizuje start-sdk → 1.5.2.',
    fr_FR: 'Met à jour start-sdk → 1.5.2.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
