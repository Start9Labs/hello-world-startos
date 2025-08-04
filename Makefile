PACKAGE_ID := $(shell awk -F"'" '/id:/ {print $$2}' startos/manifest.ts)
INGREDIENTS := $(shell start-cli s9pk list-ingredients 2>/dev/null)

CMD_ARCH_GOAL := $(filter arm x86, $(MAKECMDGOALS))
ifeq ($(CMD_ARCH_GOAL),)
  BUILD := both
else
  BUILD := $(firstword $(CMD_ARCH_GOAL))
endif

.PHONY: all arm x86 clean install check-deps check-init
.DELETE_ON_ERROR:

all: ${PACKAGE_ID}.s9pk

arm x86: ${PACKAGE_ID}.s9pk

all arm x86:
	@echo "✅ Done!$(if $(filter arm x86, $@), ($@ only))"
	@echo "   Filesize: $(shell du -h ${PACKAGE_ID}.s9pk)"

${PACKAGE_ID}.s9pk: javascript/index.js $(INGREDIENTS) | check-deps check-init
	@echo "📦 Packing '$(PACKAGE_ID).s9pk' for $(BUILD)..."
	@BUILD=$(BUILD) start-cli s9pk pack

install: ${PACKAGE_ID}.s9pk | check-deps check-init
	@HOST=$$(awk -F'/' '/^host:/ {print $$3}' ~/.startos/config.yaml); \
	if [ -z "$$HOST" ]; then \
		echo "Error: You must define \"host: http://server-name.local\" in ~/.startos/config.yaml"; \
		exit 1; \
	fi; \
	echo "\n🚀 Installing to $$HOST ..."; \
	start-cli package install $<

check-deps:
	@command -v start-cli >/dev/null || \
		(echo "Error: start-cli not found. Please see https://docs.start9.com/latest/developer-guide/sdk/installing-the-sdk" && exit 1)
	@command -v npm >/dev/null || \
		(echo "Error: npm not found. Please install Node.js and npm." && exit 1)

check-init:
	@if [ ! -f ~/.startos/developer.key.pem ]; then \
		echo "Initializing StartOS developer environment..."; \
		start-cli init; \
	fi

javascript/index.js: $(shell git ls-files startos) tsconfig.json node_modules
	npm run build

node_modules: package-lock.json
	npm ci

package-lock.json: package.json
	npm i

clean:
	@echo "Cleaning up build artifacts..."
	@rm -rf ${PACKAGE_ID}.s9pk javascript node_modules