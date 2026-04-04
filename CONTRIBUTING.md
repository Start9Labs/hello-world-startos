# Contributing

## Building and Development

See the [StartOS Packaging Guide](https://docs.start9.com/packaging/) for complete environment setup and build instructions.

### Quick Start

```bash
# Install dependencies
npm ci

# Build universal package
make
```

## How to Contribute

1. Fork the repository and create a branch from `master`
2. Make your changes
3. Open a pull request to `master`

## CI Pipeline

The CI pipeline is fully automated using [shared workflows](https://github.com/Start9Labs/shared-workflows):

```
PR opened/updated ──> Build
PR merged to master ──> Version check ──> Tag ──> Build ──> Release ──> Publish
```

### Build on PR

When you open or update a PR against `master`, the service is built automatically to verify it compiles. Draft PRs are skipped.

### Tag and release on merge

When a PR is merged to `master`:

1. The current version is extracted from `startos/versions/index.ts`
2. The version is checked against the production registry — if it already exists, the workflow fails (the version needs to be bumped)
3. A release tag is created and the service is built, released on GitHub, and published to the test registry

### Version bumping

Before merging, make sure the version in `startos/versions/` has been bumped. If you forget, the merge-to-master workflow will fail with a clear error.

### Manual releases

Admins can also push a tag manually (e.g. `v2.0.0_2`) to trigger a release without going through the version check.
