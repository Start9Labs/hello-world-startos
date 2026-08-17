<p align="center">
  <img src="icon.svg" alt="Hello World Logo" width="21%">
</p>

# Hello World on StartOS

> Everything not listed in this document should behave the same as upstream
> Hello World. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Hello World](https://github.com/Start9Labs/hello-world) is Start9's demonstration service: a single page that proves a package installs, starts, publishes an address, and can be backed up. It exists to be the simplest possible working example of a StartOS package, and this repository is the reference a new package is measured against.

- **Upstream repo:** <https://github.com/Start9Labs/hello-world>
- **Wrapper repo:** <https://github.com/Start9Labs/hello-world-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, and it is the only package here built for every architecture StartOS supports.

| Property      | Value                            |
| ------------- | -------------------------------- |
| Image         | `ghcr.io/start9labs/hello-world` |
| Architectures | x86_64, aarch64, **riscv64**     |
| Command       | `hello-world`                    |

| Subcontainer      | Purpose                                       |
| ----------------- | --------------------------------------------- |
| `hello-world-sub` | The `primary` daemon — the one to `attach` to |

riscv64 is included because this package doubles as the smoke test for a new StartOS platform: if Hello World installs and starts, the packaging runtime works there.

## Volume and Data Layout

One volume, and effectively nothing in it.

| Volume | Mount Point | Purpose                             |
| ------ | ----------- | ----------------------------------- |
| `main` | `/data`     | Mounted, but the app writes nothing |

The volume is here to demonstrate the shape a package takes, not because there is state to keep.

## File Models

None. There is no configuration file and nothing for the package to write.

## Dependencies

None.

## Network Access and Interfaces

One interface, serving the page.

| Interface | Id   | Type | Port | Description                      |
| --------- | ---- | ---- | ---- | -------------------------------- |
| Web UI    | `ui` | ui   | 80   | The web interface of Hello World |

The port is bound on the `ui-multi` MultiHost and is not masked.

## Installation and First-Run Flow

Nothing to configure and nothing to reveal. Install it, start it, open the address, and you should see the page. There is no task, no account, and no credential.

**That is the whole test.** If the page loads, StartOS installed a package, started its daemon, published an address, and routed a request to it.

## Actions

None.

## Tasks

None. This package raises no tasks, so the service is never held on a prompt and its ordinary controls are always available.

## Health Checks

One check, on the only daemon.

| Check     | Displayed       | Method               |
| --------- | --------------- | -------------------- |
| `primary` | "Web Interface" | Port 80 is listening |

A failure means the container did not start, which on a working StartOS should not happen — the service logs will say why.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. In practice **the backup is empty**, because the app writes nothing. It is here so the backup and restore paths are exercised, not because there is anything to lose.

## Limitations and Differences

1. **It does nothing.** That is the point — it is a demonstration and a smoke test, not a useful service.
2. **No configuration, no actions, no state.**
3. **The volume is mounted but unused.**

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
  - hello-world-sub # the only container
volumes:
  main: /data # mounted but unused
file_models: []
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 80 }
actions: []
tasks: []
health_checks:
  - primary # displayed "Web Interface"
```
