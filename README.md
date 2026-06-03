# Cikit

Reusable CI/CD workflows for consistent automation across all Cikit-powered projects.

## Vibe project skills

This repository includes project-local Vibe skills in `.vibe/skills/` to keep reusable GitHub Actions work consistent:

- `github-action-pinning`: resolve touched third-party actions to their latest stable version and pin them by commit SHA.
- `dogfood-reusable-action`: require a small dogfood workflow or equivalent path that exercises the public action/workflow interface.
- `quality-gate`: discover and run relevant tests, linters, formatters, and static validation before delivery.
- `reusable-action-contract`: treat reusable workflows and composite actions as stable public contracts with documented inputs, outputs, secrets, permissions, and safe defaults.

Vibe discovers these skills automatically when run from this trusted repository. Load the relevant skill before adding or changing reusable workflows, composite actions, or CI helpers.
