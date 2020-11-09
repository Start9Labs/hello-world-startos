ASSETS := $(shell yq r manifest.yaml assets.*.src)
ASSET_PATHS := $(addprefix assets/,$(ASSETS))
VERSION := $(shell toml get hello-world/Cargo.toml package.version)
HELLO_WORLD_SRC := $(shell find ./hello-world/src) hello-world/Cargo.toml hello-world/Cargo.lock

.DELETE_ON_ERROR:

all: hello-world.s9pk

install: hello-world.s9pk
	appmgr install hello-world.s9pk

hello-world.s9pk: manifest.yaml config_spec.yaml config_rules.yaml image.tar instructions.md $(ASSET_PATHS)
	appmgr -vv pack $(shell pwd) -o hello-world.s9pk
	appmgr -vv verify hello-world.s9pk

instructions.md: README.md
	cp README.md instructions.md

image.tar: Dockerfile docker_entrypoint.sh hello-world/target/armv7-unknown-linux-musleabihf/release/hello-world
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/hello-world --platform=linux/arm/v7 -o type=docker,dest=image.tar .

hello-world/target/armv7-unknown-linux-musleabihf/release/hello-world: $(HELLO_WORLD_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:armv7-musleabihf cargo +beta build --release
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:armv7-musleabihf musl-strip target/armv7-unknown-linux-musleabihf/release/hello-world

manifest.yaml: hello-world/Cargo.toml
	yq w -i manifest.yaml version $(VERSION)
