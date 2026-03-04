<p align="center">
  <img src="icon.svg" alt="Hello World Logo" width="21%">
</p>

# Hello World on StartOS

> **Upstream repo:** <https://github.com/Start9Labs/hello-world>

A minimal reference service for StartOS. It displays a simple web page — nothing more. Use [this repository](https://github.com/Start9Labs/hello-world-startos) as a template when packaging a new service for StartOS.

## Getting Started

To learn how to use this template to create your own StartOS service package, see the [Packaging Guide](https://docs.start9.com/packaging).

---

## Container Runtime

| Property      | Value                                  |
| ------------- | -------------------------------------- |
| Image         | `ghcr.io/start9labs/hello-world` |
| Architectures | x86_64, aarch64, riscv64               |
| Entrypoint    | `hello-world`                          |

## Volumes

| Volume | Mount Point | Purpose         |
| ------ | ----------- | --------------- |
| `main` | `/data`     | Persistent data |

## Network Interfaces

| Interface | Port | Protocol | Purpose              |
| --------- | ---- | -------- | -------------------- |
| Web UI    | 80   | HTTP     | Hello World web page |

## Actions

None.

## Dependencies

None.

## Backups

The `main` volume is backed up.

## Health Checks

| Check         | Method              | Messages                            |
| ------------- | ------------------- | ----------------------------------- |
| Web Interface | Port listening (80) | Ready: "The web interface is ready" |

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
actions: []
health_checks:
  - port_listening: 80
backup_volumes:
  - main
```
