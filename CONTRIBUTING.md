# Contributing

This repo packages [Hello World](https://github.com/Start9Labs/hello-world) for StartOS. It also doubles as the recommended starting template for new service packages — keep changes minimal and idiomatic.

## Documentation — keep it in sync

- **`README.md`** — what this package is and how it's built (image, volumes, interfaces). For developers and AI assistants.
- **`instructions.md`** — the user-facing instructions packed into the `.s9pk` and shown on the **Instructions** tab in StartOS, for the person running the service.
- **`CONTRIBUTING.md`** — this file.
- **`CLAUDE.md`** — operating rules for AI developers working in this repo.

**Any code change that warrants it must update `README.md` and `instructions.md` in the same change** — a new or renamed action, an added or removed volume / port / interface / dependency, a changed default, a new limitation, any altered user-visible behavior. Don't defer: a package that ships with a stale README or stale instructions is not done, even if the code is perfect. Content rules live in the packaging guide: [Writing READMEs](https://docs.start9.com/packaging/writing-readmes.html) and [Writing Service Instructions](https://docs.start9.com/packaging/writing-instructions.html).

## Building

See the [StartOS Packaging Guide](https://docs.start9.com/packaging/) for environment setup, then:

```bash
npm ci    # install dependencies
make      # build the universal .s9pk
```

## Updating the upstream version

Hello World runs the `ghcr.io/start9labs/hello-world` image. To track a new upstream release:

1. Bump `dockerTag` in `startos/manifest/index.ts` to `ghcr.io/start9labs/hello-world:<new version>`.
2. Update `version` and `releaseNotes` in the file under `startos/versions/`, renaming it to the new version string. A *new* version file is only needed when the bump carries an `up`/`down` migration, or when you want the old release notes preserved in git history — see [Versions](https://docs.start9.com/packaging/versions.html).
3. Rebuild (`make`), sideload the `.s9pk`, and confirm it starts.
4. Review `README.md` and `instructions.md` for anything the bump changed.

## GitHub Actions

Three workflows live under `.github/workflows/`. All three are thin wrappers that call reusable workflows in [`start9labs/shared-workflows`](https://github.com/Start9Labs/shared-workflows); the local files just configure triggers, pass inputs, and forward secrets. `release.yml` and `tagAndRelease.yml` additionally carry a guard that skips publishing while `startos/manifest/index.ts` still has `id: 'hello-world'` — so this template never auto-publishes itself. When you fork it and rename the package, the guard naturally lets your package through.

- **`build.yml` — PR validation.** Triggered by `pull_request` against `master` (non-draft, ignoring `*.md` changes) and `workflow_dispatch`. Builds the `.s9pk` and uploads each arch as its own 14-day artifact. Use it during development: open a PR, wait for the green check, download the artifact from the run's summary page to sideload and smoke-test before merging. Cancels in-progress runs on the same branch/PR when new commits land.

- **`tagAndRelease.yml` — master → test registry.** Triggered by push to `master` (ignoring `*.md`). Reads `version` from the manifest, checks the configured `REFERENCE_REGISTRY` (production), and skips if that version is already published there. Otherwise it force-pushes a `v<version>` tag at the current commit and chains into the shared `release.yml`, which builds per arch and publishes to `RELEASE_REGISTRY` (the test registry — `alpha` for Start9-maintained packages). This is the normal path: bump `version`, merge to `master`, the test-registry release happens automatically.

- **`release.yml` — tag → test registry.** Triggered by pushing a `v*.*` tag directly. Same downstream behavior as `tagAndRelease.yml`'s release step (build matrix → GitHub Release with manifest release notes + SHA256s → publish to `RELEASE_REGISTRY`, optionally via S3 if `S3_S9PKS_BASE_URL`/`S3_*_KEY` are configured), but without the production-registry version-check guard. Use it to re-cut a release at a specific commit, or to ship from a branch you haven't merged into `master`. For routine bumps, prefer letting `tagAndRelease.yml` do this for you.

Promotion from the test registry (`alpha`) to `beta` and `prod` is a separate, manual step performed by maintainers — not part of these workflows.

## How to contribute

1. Fork the repository and create a branch from `master`.
2. Make your changes — including the doc updates above.
3. Open a pull request to `master`.
