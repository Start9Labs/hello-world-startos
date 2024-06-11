PACKAGE_ID := hello-world

# Phony targets
.PHONY: all clean install

# Default target
all: ${PACKAGE_ID}.s9pk

# Build targets
${PACKAGE_ID}.s9pk: icon.png instructions.md LICENSE Dockerfile javascript/index.js
	start-cli s9pk pack --license=LICENSE

javascript/index.js: $(shell git ls-files startos) node_modules package.json
	npm run build

node_modules: package.json package-lock.json
	npm ci
	npm link @start9labs/start-sdk

package-lock.json: package.json
	npm i

# Clean target
clean:
	rm -rf ${PACKAGE_ID}.s9pk
	rm -rf javascript
	rm -rf node_modules

# Install target
install:
	@if [ ! -f ~/.startos/config.yaml ]; then echo "You must define \"host: http://server-name.local\" in ~/.startos/config.yaml config file first."; exit 1; fi
	@echo "\nInstalling to $$(grep -v '^#' ~/.startos/config.yaml | cut -d'/' -f3) ...\n"
	@[ -f $(PACKAGE_ID).s9pk ] || ( $(MAKE) && echo "\nInstalling to $$(grep -v '^#' ~/.startos/config.yaml | cut -d'/' -f3) ...\n" )
	@start-cli package install -s $(PACKAGE_ID).s9pk
