# Wrapper for hello-world

`hello-world` is a simple, minimal project to serve as a template for creating an app for the Embassy.

## Dependencies

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [yq](https://mikefarah.gitbook.io/yq)
- [make](https://www.gnu.org/software/make/)
- [toml](https://crates.io/crates/toml-cli)

`cargo install toml-cli`

- [appmgr (portable)](https://github.com/Start9Labs/embassy-os/tree/master/appmgr)

`cargo install --path=. --features=portable`


## Cloning

Clone the project locally. Note the submodule link to the original project(s). 

```
git clone git@github.com:Start9Labs/hello-world-wrapper.git
cd hello-world-wrapper

#During the 0.3.x beta (it won't be needed once on main), run this:
git pull --rebase origin integration/0.3.0

```

## Building

To build the project, run the following commands:

```
make
```

## Installing (on Embassy)

SSH into an Embassy device.
`scp` the `.s9pk` to any directory from your local machine.
Run the following command to install the package:

```
#Login to embassy-cli
embassy-cli auth login
#Enter your device password
#Then enter...
embassy-cli package install hello-world.s9pk
```
## Verify Install

Go to your Embassy Services page and select Hello World and start the service.
