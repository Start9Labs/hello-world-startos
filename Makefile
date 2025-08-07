PACKAGE_ID := $(shell awk -F"'" '/id:/ {print $$2}' startos/manifest.ts)
INGREDIENTS := $(shell start-cli s9pk list-ingredients 2>/dev/null)

CMD_ARCH_GOAL := $(filter arm x86, $(MAKECMDGOALS))
ifeq ($(CMD_ARCH_GOAL),)
  BUILD := universal
else
  BUILD := $(firstword $(CMD_ARCH_GOAL))
endif

LAST_BUILD_STAMP := startos/.lba

.PHONY: all arm x86 clean install check-deps check-init package ingredients
.DELETE_ON_ERROR:

all arm x86: package
	@echo "✅ Done!$(if $(filter arm x86, $@), ($@ only))"

package: javascript/index.js ingredients | check-deps check-init
	@if [ ! -f "${PACKAGE_ID}.s9pk" ] || [ "$(BUILD)" != "$$(cat ${LAST_BUILD_STAMP} 2>/dev/null)" ]; then \
		echo "   Packing '${PACKAGE_ID}.s9pk' for $(BUILD)..."; \
		BUILD=$(BUILD) start-cli s9pk pack; \
		echo "$(BUILD)" > ${LAST_BUILD_STAMP}; \
	else \
		echo "ℹ️  No code changes detected for $(BUILD) platform build."; \
	fi; \
	echo "📦 Filesize: $$(du -h ${PACKAGE_ID}.s9pk)"

ingredients: $(INGREDIENTS)
	@echo "   Re-evaluating ingredients..."

install: package | check-deps check-init
	@HOST=$$(awk -F'/' '/^host:/ {print $$3}' ~/.startos/config.yaml); \
	if [ -z "$$HOST" ]; then \
		echo "Error: You must define \"host: http://server-name.local\" in ~/.startos/config.yaml"; \
		exit 1; \
	fi; \
	echo "\n🚀 Installing to $$HOST ..."; \
	start-cli package install -s ${PACKAGE_ID}.s9pk

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
	@rm -rf ${PACKAGE_ID}.s9pk javascript node_modules ${LAST_BUILD_STAMP}