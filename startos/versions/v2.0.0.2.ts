import { VersionInfo } from '@start9labs/start-sdk'

export const v_2_0_0_2 = VersionInfo.of({
  version: '2.0.0:2',
  releaseNotes: {
    en_US: 'Initial release for StartOS 0.4.0',
    es_ES: 'Lanzamiento inicial para StartOS 0.4.0',
    de_DE: 'Erstveröffentlichung für StartOS 0.4.0',
    pl_PL: 'Pierwsze wydanie dla StartOS 0.4.0',
    fr_FR: 'Version initiale pour StartOS 0.4.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
