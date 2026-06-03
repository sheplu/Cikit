---
name: reusable-action-contract
description: Use this when designing reusable GitHub Actions workflows or composite actions. Ensures public interfaces are stable, documented, minimal, and safe for many repositories.
---

# Reusable Action Contract

Reusable workflows and composite actions are public APIs. Treat changes to them as contract changes.

When adding or changing one:

1. Keep the interface minimal and explicit:
   - Declare all inputs with clear descriptions.
   - Mark required inputs only when a safe default is impossible.
   - Declare outputs that consumers can rely on.
   - Document required secrets and permissions.
2. Prefer secure defaults:
   - Set the least required `permissions` for workflows and jobs.
   - Avoid exposing secrets to pull requests from forks.
   - Avoid command injection by quoting shell variables and validating user-controlled inputs.
3. Keep behavior portable across Sheplu repositories:
   - Avoid repository-specific paths unless configurable.
   - Use language/tool auto-detection only when deterministic.
   - Fail fast with actionable errors when prerequisites are missing.
4. Document the contract in `README.md` or action-local documentation:
   - Purpose and expected use cases.
   - Minimal example.
   - Inputs, outputs, secrets, permissions, and assumptions.
   - Versioning and migration notes for breaking changes.
5. Preserve backward compatibility unless the user explicitly asks for a breaking change.

Before finishing:

- Compare the docs, dogfood workflow, and implementation to ensure they describe the same interface.
- Call out any breaking change explicitly.
