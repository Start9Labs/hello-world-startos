<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

## Hello World for StartOS

[Hello World](https://github.com/start9labs/hello-world) is a template service that provides examples of basic StartOS features.

This repository contains the source code for building the `.s9pk` package of **Hello World** for [StartOS](https://github.com/Start9Labs/start-os/), enabling installation and updates via the StartOS services system.

## Build environment

For local builds, set up the build environment using the official
[setup guide](https://staging.docs.start9.com/packaging-guide/environment-setup.html).

## Build and install

```sh
git clone https://github.com/Start9Labs/hello-world-startos.git
cd hello-world-startos
make
make install
```

> Note: Alternatively, sideload the generated `hello-world.s9pk` via **StartOS > Sideload** tab.

## After install

On the StartOS device, open **Services > Hello World** and proceed as directed in the service UI.
