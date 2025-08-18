PACKAGE_ID := $(shell awk -F"'" '/id:/ {print $$2}' startos/manifest.ts)
INGREDIENTS := $(shell start-cli s9pk list-ingredients 2>/dev/null)

CMD_ARCH_GOAL := $(filter aarch64 x86_64, $(MAKECMDGOALS))
ifeq ($(CMD_ARCH_GOAL),)
  BUILD := universal
  S9PK := $(PACKAGE_ID).s9pk
else
  BUILD := $(firstword $(CMD_ARCH_GOAL))
  S9PK := $(PACKAGE_ID)_$(BUILD).s9pk
endif

.PHONY: all aarch64 x86_64 clean install check-deps check-init package ingredients
.DELETE_ON_ERROR:

all: $(PACKAGE_ID).s9pk
	@echo "✅ Done!"

$(BUILD): $(PACKAGE_ID)_$(BUILD).s9pk
	@echo "✅ Done! ($(BUILD) only)"

$(S9PK): $(INGREDIENTS)
	@$(MAKE) --no-print-directory ingredients
	@echo "   Packing '$(S9PK)'..."
	BUILD=$(BUILD) start-cli s9pk pack -o $(S9PK)

ingredients: $(INGREDIENTS)
	@echo "   Re-evaluating ingredients..."

install: package | check-deps check-init
	@HOST=$$(awk -F'/' '/^host:/ {print $$3}' ~/.startos/config.yaml); \
	if [ -z "$$HOST" ]; then \
		echo "Error: You must define \"host: http://server-name.local\" in ~/.startos/config.yaml"; \
		exit 1; \
	fi; \
	echo "\n🚀 Installing to $$HOST ..."; \
	start-cli package install -s $(S9PK)

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

javascript/index.js: $(shell find startos -type f) tsconfig.json node_modules
	npm run build

node_modules: package-lock.json
	npm ci

package-lock.json: package.json
	npm i

clean:
	@echo "Cleaning up build artifacts..."
	@rm -rf $(PACKAGE_ID).s9pk $(PACKAGE_ID)_x86_64.s9pk $(PACKAGE_ID)_aarch64.s9pk javascript node_modules