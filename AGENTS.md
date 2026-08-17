# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **This package is a reference and a smoke test, so keep it minimal.** Its value is being the simplest thing that installs, starts, publishes an address, and backs up — resist adding actions, config, or state to demonstrate a feature. Demonstrate those in the packaging guide instead.
- **riscv64 is declared here and almost nowhere else.** That is deliberate: this is what gets installed first on a new StartOS platform to prove the packaging runtime works there. Don't drop it to match the rest of the fleet.
- **The `main` volume is mounted but unused**, so the volume and backup paths are exercised. Don't remove it, and don't invent a store for it.
