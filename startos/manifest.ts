import { setupManifest } from '@start9labs/start-sdk'
import { versions } from './versions'

/**
 * Here we define static properties of the package to be displayed in the Marketplace and used by StartOS.
 */
export const manifest = setupManifest(versions, {
  id: 'hello-world',
  title: 'Hello World',
  license: 'mit',
  wrapperRepo: 'https://github.com/Start9Labs/hello-world-wrapper',
  upstreamRepo: 'https://github.com/Start9Labs/hello-world',
  supportSite: 'https://docs.start9.com/',
  marketingSite: 'https://start9.com/',
  donationUrl: 'https://donate.start9.com/',
  description: {
    short: 'Bare bones example of a StartOS service',
    long: 'Hello World is a template service that provides examples of basic StartOS features.',
  },
  assets: [], // directories of static files you want to mount to your container
  volumes: ['main'], // IDs of persistence volumes that will be mounted to your container
  images: {
    main: {
      source: {
        dockerTag: 'start9/hello-world',
      },
    },
  },
  hardwareRequirements: {},
  // optional alerts to display at different time in the service lifecycle
  alerts: {
    install: 'Optional alert to display before installing the service',
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {}, // See Hello Moon for an example with dependencies
})
