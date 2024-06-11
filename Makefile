PACKAGE_ID := hello-world

.PHONY: clean all

all: ${PACKAGE_ID}.s9pk

clean:
	rm ${PACKAGE_ID}.s9pk
	rm -rf javascript
	rm -rf node_modules

${PACKAGE_ID}.s9pk: icon.png instructions.md LICENSE Dockerfile javascript/index.js
	start-cli s9pk pack --license=LICENSE

javascript/index.js: $(shell git ls-files startos) node_modules package.json
	npm run build

node_modules: package.json package-lock.json
	npm ci

package-lock.json: package.json
	npm i