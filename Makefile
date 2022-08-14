VERSION := $(shell yq e ".version" manifest.yaml)
HELLO_WORLD_SRC := $(shell find ./hello-world/src) hello-world/Cargo.toml hello-world/Cargo.lock
S9PK_PATH=$(shell find . -name hello-world.s9pk -print)
TS_FILES := $(shell find ./ -name \*.ts)

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: verify

install:
	embassy-cli package install $(S9PK_PATH)

verify: hello-world.s9pk $(S9PK_PATH)
	embassy-sdk verify s9pk $(S9PK_PATH)

clean:
	rm -f image.tar
	rm -f $(S9PK_PATH)
	rm -f scripts/*.js

hello-world.s9pk: manifest.yaml instructions.md icon.png LICENSE scripts/embassy.js image.tar
	embassy-sdk pack

image.tar: Dockerfile docker_entrypoint.sh check-web.sh hello-world/target/aarch64-unknown-linux-musl/release/hello-world
	DOCKER_CLI_EXPERIMENTAL=enabled docker buildx build --tag start9/hello-world/main:$(VERSION) --platform=linux/arm64 -o type=docker,dest=image.tar .

hello-world/target/aarch64-unknown-linux-musl/release/hello-world: $(HELLO_WORLD_SRC)
	docker run --rm -it -v ~/.cargo/registry:/root/.cargo/registry -v "$(shell pwd)"/hello-world:/home/rust/src start9/rust-musl-cross:aarch64-musl cargo build --release

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js
