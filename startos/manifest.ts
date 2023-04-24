import { setupManifest } from 'start-sdk/lib/manifest'

export const manifest = setupManifest({
  // The package identifier used by the OS. This must be unique amongst all other known packages
  id: 'hello-world',
  // A human readable service title
  title: 'Hello World',
  // Service version - accepts up to four digits, where the last confirms to revisions necessary for EmbassyOS - see documentation: https://github.com/Start9Labs/emver-rs. This value will change with each release of the service
  version: '4.0.0.0',
  // Release notes for the update - can be a string, paragraph or URL
  releaseNotes: 'Revamped for StartOS 0.4.0',
  // The type of license for the project. Include the LICENSE in the root of the project directory. A license is required for a Start9 package.
  license: 'mit',
  // A list of normie (hosted, SaaS, custodial, etc) services this services intends to replace
  replaces: Array<string>(),
  // The Start9 wrapper repository URL for the package. This repo contains the manifest file (this), any scripts necessary for configuration, backups, actions, or health checks (more below). This key must exist. But could be embedded into the source repository
  wrapperRepo: 'https://github.com/Start9Labs/hello-world-wrapper',
  // The original project repository URL. There is no upstream repo in this example
  upstreamRepo: 'https://github.com/Start9Labs/hello-world',
  // URL to the support site / channel for the project. This key can be omitted if none exists, or it can link to the original project repository issues
  supportSite: 'https://docs.start9.com/',
  // URL to the marketing site for the project. This key can be omitted if none exists, or it can link to the original project repository
  marketingSite: 'https://start9.com/',
  // URL where users can donate to the upstream project
  donationUrl: 'https://donate.start9.com/',
  // Human readable descriptors for the service. These are used throughout the EmbassyOS user interface, primarily in the marketplace.
  description: {
    // This is the first description visible to the user in the marketplace
    short: 'Example service',
    // This description will display with additional details in the service's individual marketplace page
    long: 'Hello World is a bare-bones service that launches a web interface to say "Hello World", and nothing more.',
  },
  // These assets are static files necessary for packaging the service for Start9 (into an s9pk). Each value is a path to the specified asset. If an asset is missing from this list, or otherwise denoted, it will be defaulted to the values denoted below.
  assets: {
    license: 'LICENSE',
    icon: 'assets/icon.png',
    instructions: 'assets/instructions.md',
  },
  // This denotes any data, asset, or pointer volumes that should be connected when the "docker run" command is invoked
  volumes: {
    // This is the image where files from the project asset directory will go
    main: 'data',
  },
  // Defines the containers needed to run the main and mounted volumes
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
    uninstall: 'Optional alert to display before uninstalling the service',
    restore:
      'Optional alert to display before restoring the service from backup',
    start: 'Optional alert to display before starting the service',
    stop: 'Optional alert to display before stopping the service',
  },
  dependencies: {
    Test: {
      version: '1234',
      description: '',
      requirement: { type: 'opt-out', how: 'During config' },
    },
  },
})

export type Manifest = typeof manifest
