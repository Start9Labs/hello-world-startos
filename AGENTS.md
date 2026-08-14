# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (the package's technical reference — the only one an AI support or administering agent reads) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Scaffolding does not come from here.** `start-cli s9pk init-package` copies `projects/start-sdk/docs/package-template/` out of the monorepo, so changing this package does not change what a new package is scaffolded with. When a packaging convention changes, the two have to be brought into step by hand — and the template is the one that matters.
