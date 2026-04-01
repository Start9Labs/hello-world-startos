<p align="center">
  <img src="icon.svg" alt="Hello World Logo" width="21%">
</p>

# Hello World on StartOS

> **Upstream repo:** <https://github.com/Start9Labs/hello-world>

A minimal reference service for StartOS. It displays a simple web page — nothing more. Use [this repository](https://github.com/Start9Labs/hello-world-startos) as a template when packaging a new service for StartOS.

## Getting Started

To learn how to use this template to create your own StartOS service package, see the [Packaging Guide](https://docs.start9.com/packaging).

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                  |
| ------------- | -------------------------------------- |
| Image         | `ghcr.io/start9labs/hello-world`       |
| Architectures | x86_64, aarch64, riscv64               |
| Command       | `hello-world`                          |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose         |
| ------ | ----------- | --------------- |
| `main` | `/data`     | Persistent data |

---

## Installation and First-Run Flow

No special setup. Install and start — the web page is immediately available.

---

## Configuration Management

No configurable settings. The service runs with no user-facing configuration.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose              |
| --------- | ---- | -------- | -------------------- |
| Web UI    | 80   | HTTP     | Hello World web page |

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

None.

---

## Backups and Restore

**Included in backup:**

- `main` volume

**Restore behavior:** Volume is fully restored before the service starts.

---

## Health Checks

| Check         | Method              | Messages                                                           |
| ------------- | ------------------- | ------------------------------------------------------------------ |
| Web Interface | Port listening (80) | Success: "The web interface is ready" / Error: "The web interface is not ready" |

---

## Dependencies

None.

---

## Limitations and Differences

1. **No meaningful functionality** — this is a reference/template package only

---

## What Is Unchanged from Upstream

The service is identical to upstream. There are no modifications.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: hello-world
image: ghcr.io/start9labs/hello-world
architectures: [x86_64, aarch64, riscv64]
volumes:
  main: /data
ports:
  ui: 80
dependencies: none
startos_managed_env_vars: none
actions: none
```
