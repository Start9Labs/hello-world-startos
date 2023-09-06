import { setupManifest } from '@start9labs/start-sdk/lib/manifest/setupManifest'

/**
 * In this function you define static properties of the service to be displayed in the Marketplace and used by StartOS
 */
export const manifest = setupManifest({
  id: 'hello-world',
  title: 'Hello World',
  version: '4.0.0.1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  license: 'mit',
  replaces: Array<string>('Hello World (hosted)', 'Goodbye World'),
  wrapperRepo: 'https://github.com/Start9Labs/hello-world-wrapper',
  upstreamRepo: 'https://github.com/Start9Labs/hello-world',
  supportSite: 'https://docs.start9.com/',
  marketingSite: 'https://start9.com/',
  donationUrl: 'https://donate.start9.com/',
  description: {
    short: 'Example service for s9pk highlighting basic features',
    long: 'Hello World is a template service that provides examples of basic StartOS features.',
  },
  // Relative paths to asset files
  assets: {
    license: 'LICENSE',
    icon: 'assets/icon.png',
    instructions: 'assets/instructions.md',
  },
  volumes: {
    // This is the image where files from the project asset directory will go
    main: 'data',
  },
  containers: {
    main: {
      // Identifier for the main image volume, which will be used when other actions need to mount to this volume.
      image: 'main',
      // Specifies where to mount the data volume(s), if there are any. Mounts for pointer dependency volumes are also denoted here. These are necessary if data needs to be read from / written to these volumes.
      mounts: {
        // Specifies where on the service's file system its persistence directory should be mounted prior to service startup
        main: '/data',
      },
    },
  },
  alerts: {
    install: 'Optional alert to display before installing the service',
    update: 'Optional alert to display before updating the service',
    uninstall: 'Optional alert to display before uninstalling the service',
    restore:
      'Optional alert to display before restoring the service from backup',
    start: 'Optional alert to display before starting the service',
    stop: 'Optional alert to display before stopping the service',
  },
  /** See Hello Moon for an example with dependencies */
  dependencies: {},
})

export type Manifest = typeof manifest
