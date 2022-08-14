ID_NAME := $(shell yq e ".id" manifest.yaml)
VERSION := $(shell yq e ".version" manifest.yaml)
TS_FILES := $(shell find ./ -name \*.ts)
HELLO_WORLD_SRC := $(shell find ./hello-world/src) hello-world/Cargo.toml hello-world/Cargo.lock

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: verify

install:
	embassy-cli package install $(ID_NAME).s9pk

verify: $(ID_NAME).s9pk
	embassy-sdk verify s9pk $(ID_NAME).s9pk

clean:
	rm -f image.tar
	rm -f $(ID_NAME).s9pk
	rm -f scripts/*.js

$(ID_NAME).s9pk: manifest.yaml instructions.md icon.png LICENSE scripts/embassy.js image.tar
	embassy-sdk pack

image.tar: Dockerfile docker_entrypoint.sh check-web.sh hello-world/target/aarch64-unknown-linux-musl/release/hello-world
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/$(ID_NAME)/main:$(VERSION) --platform=linux/arm64 -o type=docker,dest=image.tar .

hello-world/target/aarch64-unknown-linux-musl/release/hello-world: $(HELLO_WORLD_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:aarch64-musl cargo build --release

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js
