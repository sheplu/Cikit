---
name: quality-gate
description: Use this for every code, workflow, action, documentation, or configuration change. Requires discovering and running the relevant tests, linters, formatters, and validation commands before delivery.
---

# Quality Gate

Before delivering changes:

1. Discover quality commands from repository files instead of guessing:
   - `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, and docs.
   - Package manifests such as `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Makefile`, `justfile`, or workflow files.
2. Run the narrowest relevant check first.
3. Run broader checks when the change can affect shared behavior, CI, or reusable actions.
4. For GitHub Actions content, include static validation when available:
   - `actionlint` for workflow syntax and common mistakes.
   - YAML formatting/linting when configured.
5. If no project-specific command exists, perform available baseline checks:
   - Parse changed YAML files.
   - Inspect shell snippets with `bash -n` when extractable.
   - Review changed files for unresolved placeholders, TODO-only behavior, and secret-like values.

When a check fails:

- Determine whether the failure is caused by the current change.
- Fix in-scope failures before delivery.
- For unrelated or environment-blocked failures, report the exact command and the key error.

Delivery must include:

- The commands run.
- Whether each command passed, failed, or was skipped with a reason.
