import { setupManifest } from '@start9labs/start-sdk'
import { short, long } from './i18n'

export const manifest = setupManifest({
  id: 'hello-world',
  title: 'Hello World',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/hello-world-startos',
  upstreamRepo: 'https://github.com/Start9Labs/hello-world',
  supportSite: 'https://docs.start9.com/',
  marketingSite: 'https://start9.com/',
  donationUrl: 'https://donate.start9.com/',
  docsUrl: 'https://github.com/Start9Labs/hello-world/blob/master/README.md',
  description: { short, long },
  volumes: ['main'],
  images: {
    'hello-world': {
      source: { dockerTag: 'ghcr.io/start9labs/hello-world:2.0.0' },
      arch: ['x86_64', 'aarch64', 'riscv64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
