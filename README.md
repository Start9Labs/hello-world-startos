<p align="center">
  <img src="icon.svg" alt="Hello World Logo" width="21%">
</p>

# Hello World on StartOS

> Everything not listed in this document should behave the same as upstream
> Hello World. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

A minimal reference service for StartOS. It serves a single static web page and does nothing else, which makes it the smallest complete package to read end to end. To start a package of your own, scaffold it with `start-cli s9pk init-package` and follow the [Packaging Guide](https://docs.start9.com/packaging) — don't copy this repository.

- **Upstream repo:** <https://github.com/Start9Labs/hello-world>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The upstream image is used unmodified. One subcontainer runs the whole service.

| Property      | Value                                                                |
| ------------- | -------------------------------------------------------------------- |
| Image         | `ghcr.io/start9labs/hello-world`                                     |
| Architectures | x86_64, aarch64, riscv64                                             |
| Command       | `hello-world`                                                        |
| Subcontainer  | `hello-world-sub` — the `primary` daemon, and the one to `attach` to |

## Volume and Data Layout

One volume, which the web server does not currently write to — it exists so the package demonstrates the shape a real service needs.

| Volume | Mount Point | Purpose                    |
| ------ | ----------- | -------------------------- |
| `main` | `/data`     | Service data (unused here) |

## File Models

None. The service takes no configuration, so the package writes no config file and keeps no `store.json` — there is nothing on disk to inspect or correct.

## Dependencies

None.

## Network Access and Interfaces

One interface, serving the static page. Nothing is exported for dependent services.

| Interface | Id   | Type | Port | Description               |
| --------- | ---- | ---- | ---- | ------------------------- |
| Web UI    | `ui` | ui   | 80   | The static page it serves |

The port is bound on the `ui-multi` MultiHost and is not masked.

## Installation and First-Run Flow

Nothing differs from a plain start. There is no setup wizard to skip, no credential to generate, and no task raised on install — the service is usable as soon as it is running.

## Actions

None.

## Health Checks

One check, on the primary daemon.

| Check                     | Method               | Grace Period |
| ------------------------- | -------------------- | ------------ |
| `primary` "Web Interface" | Port 80 is listening | SDK default  |

It confirms the port is open, not that the page renders. For a static server the two are equivalent in practice; a real service should probe an endpoint that only answers once the application is actually serving.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. No dump step and nothing excluded. Since the service stores no state, a restore is indistinguishable from a fresh install.

## Limitations and Differences

1. **It does nothing.** Hello World serves one static page. It has no configuration, no accounts, and no data — by design, as the smallest complete example of a StartOS package.

---

## Quick Reference for AI Consumers

```yaml
package_id: hello-world
image: ghcr.io/start9labs/hello-world
architectures:
  - x86_64
  - aarch64
  - riscv64
subcontainers:
  - hello-world-sub
volumes:
  main: /data
file_models: []
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 80 }
actions: []
tasks: []
health_checks:
  - primary # the daemon's ready check, displayed "Web Interface"
```
