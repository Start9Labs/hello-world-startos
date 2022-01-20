ASSETS := $(shell yq e '.assets.[].src' manifest.yaml)
ASSET_PATHS := $(addprefix assets/,$(ASSETS))
VERSION := $(shell yq e ".version" manifest.yaml)
HELLO_WORLD_SRC := $(shell find ./hello-world/src) hello-world/Cargo.toml hello-world/Cargo.lock
S9PK_PATH=$(shell find . -name hello-world.s9pk -print)

.DELETE_ON_ERROR:

all: verify

verify: hello-world.s9pk $(S9PK_PATH)
		embassy-sdk verify $(S9PK_PATH)

clean:
		rm -f image.tar
		rm -f hello-world.s9pk

# install: hello-world.s9pk
# 		embassy-cli package install hello-world

# embassy-sdk pack errors come from here, check your manifest, config, instructions, and icon
hello-world.s9pk: manifest.yaml assets/compat/config_spec.yaml config_rules.yaml image.tar docs/instructions.md $(ASSET_PATHS)
		embassy-sdk pack

image.tar: Dockerfile docker_entrypoint.sh hello-world/target/aarch64-unknown-linux-musl/release/hello-world
		DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/hello-world/main:$(VERSION) --platform=linux/arm64 -o type=docker,dest=image.tar .

hello-world/target/aarch64-unknown-linux-musl/release/hello-world: $(HELLO_WORLD_SRC)
		docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:aarch64-musl cargo +beta build --release
		docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:aarch64-musl musl-strip target/aarch64-unknown-linux-musl/release/hello-world

manifest.yaml: hello-world/Cargo.toml
		yq e -i '.version = $(VERSION)' manifest.yaml
