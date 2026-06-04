# Cikit

Reusable CI/CD workflows for consistent automation across all Cikit-powered projects.

## Node.js reusable workflows

These workflows are designed for Node.js packages like `@sheplu/dependency-guard` and other npm-style projects.
They are reusable workflow contracts, so consumers should call them from their own repository workflows with `uses:`.

### Node.js CI

Runs dependency installation plus package scripts such as `lint`, `typecheck`, `test`, and `build`.
It auto-detects npm, pnpm, or Yarn from `packageManager` and lockfiles, or the package manager can be set explicitly.

```yaml
jobs:
  ci:
    uses: sheplu/Cikit/.github/workflows/node-ci.yml@main
    with:
      node-version: 24.x
      scripts: lint,typecheck,test,build
      skip-missing-scripts: false
```

Inputs:

| Input | Default | Description |
| --- | --- | --- |
| `node-version` | `24.x` | Node.js version passed to `actions/setup-node`. |
| `working-directory` | `.` | Directory containing `package.json`. |
| `package-manager` | `auto` | `auto`, `npm`, `pnpm`, or `yarn`. |
| `install` | `true` | Install dependencies before scripts. |
| `cache` | `true` | Enable dependency caching when a lockfile is present. |
| `scripts` | `lint,typecheck,test,build` | Comma- or newline-separated scripts to run in order. |
| `skip-missing-scripts` | `true` | Skip missing package scripts instead of failing. |
| `checkout-ref` | empty | Optional Git ref to checkout. |

Outputs:

| Output | Description |
| --- | --- |
| `package-manager` | Detected or selected package manager. |
| `scripts-run` | Comma-separated list of scripts that ran. |

Required permissions: `contents: read`.

### Dependency guard

Runs `@sheplu/dependency-guard` and writes a dependency summary to the GitHub job summary.
It exposes the package summary counts as outputs for downstream gates or notifications.

```yaml
jobs:
  dependency-guard:
    uses: sheplu/Cikit/.github/workflows/dependency-guard.yml@main
    with:
      node-version: 24.x
      fail-on: major
      ignore-scopes: '@internal'
```

Inputs:

| Input | Default | Description |
| --- | --- | --- |
| `node-version` | `24.x` | Node.js version used to run `@sheplu/dependency-guard`. |
| `working-directory` | `.` | Directory containing the package manifest. |
| `package-json` | `package.json` | Package manifest path relative to `working-directory`. |
| `dependency-guard-version` | `latest` | Version or dist-tag of `@sheplu/dependency-guard`. |
| `registry-url` | `https://registry.npmjs.org` | Registry URL passed to dependency-guard. |
| `fail-on` | empty | Optional dependency-guard `--fail-on` value. |
| `max-age` | empty | Optional dependency-guard `--max-age` value in days. |
| `prod` | `true` | Include production dependencies. |
| `dev` | `true` | Include development dependencies. |
| `peer` | `true` | Include peer dependencies. |
| `optional` | `true` | Include optional dependencies. |
| `ignore-scopes` | empty | Comma- or newline-separated scopes to ignore. |
| `only` | empty | Comma- or newline-separated package names to check. |
| `no-cache` | `false` | Disable dependency-guard registry cache. |
| `checkout-ref` | empty | Optional Git ref to checkout. |

Outputs:

| Output | Description |
| --- | --- |
| `total` | Total dependencies reported. |
| `up-to-date` | Dependencies reported as up to date. |
| `minor-updates` | Dependencies with minor updates. |
| `major-updates` | Dependencies with major updates. |

Required permissions: `contents: read`.

### npm publish

Runs optional quality scripts and publishes a package to npm. It supports npm trusted publishing through OIDC
or an optional `npm-token` secret. Use `dry-run: true` for release validation without publishing.

```yaml
jobs:
  publish:
    uses: sheplu/Cikit/.github/workflows/npm-publish.yml@main
    permissions:
      contents: read
      id-token: write
    with:
      node-version: 24.x
      quality-scripts: lint,typecheck,test,build
      dry-run: ${{ github.event_name != 'release' }}
```

Inputs:

| Input | Default | Description |
| --- | --- | --- |
| `node-version` | `24.x` | Node.js version passed to `actions/setup-node`. |
| `working-directory` | `.` | Directory containing the package to publish. |
| `package-manager` | `auto` | `auto`, `npm`, `pnpm`, or `yarn`. |
| `install` | `true` | Install dependencies before quality scripts and publish. |
| `quality-scripts` | `lint,typecheck,test,build` | Comma- or newline-separated scripts to run before publishing. |
| `skip-missing-scripts` | `true` | Skip missing quality scripts instead of failing. |
| `registry-url` | `https://registry.npmjs.org` | npm-compatible registry URL. |
| `tag` | `latest` | npm dist-tag. |
| `access` | `public` | `public`, `restricted`, or empty to omit `--access`. |
| `provenance` | `true` | Add npm provenance attestation for real publishes. |
| `dry-run` | `false` | Run `npm publish --dry-run` instead of publishing. |
| `checkout-ref` | empty | Optional Git ref to checkout. |

Secrets:

| Secret | Required | Description |
| --- | --- | --- |
| `npm-token` | No | Optional npm automation token. Prefer trusted publishing with `id-token: write`. |

Outputs:

| Output | Description |
| --- | --- |
| `package-name` | Name read from package.json. |
| `package-version` | Version read from package.json. |

Required permissions: `contents: read`; add `id-token: write` for trusted publishing and npm provenance.

## Dogfood workflow

`.github/workflows/dogfood-node.yml` exercises all three public reusable workflow interfaces against
`fixtures/node-basic`:

- `node-ci.yml` runs the fixture `lint`, `typecheck`, `test`, and `build` scripts.
- `dependency-guard.yml` runs `@sheplu/dependency-guard` on the fixture manifest.
- `npm-publish.yml` runs the same quality scripts and `npm publish --dry-run`.

## Vibe project skills

This repository includes project-local Vibe skills in `.vibe/skills/` to keep reusable GitHub Actions work consistent:

- `github-action-pinning`: resolve touched third-party actions to their latest stable version and pin them by commit SHA.
- `dogfood-reusable-action`: require a small dogfood workflow or equivalent path that exercises the public action/workflow interface.
- `quality-gate`: discover and run relevant tests, linters, formatters, and static validation before delivery.
- `pr-commit-conventions`: enforce repository-owner commit attribution, Conventional Commit messages, and PR metadata without AI authorship or co-authorship mentions.
- `reusable-action-contract`: treat reusable workflows and composite actions as stable public contracts with documented inputs, outputs, secrets, permissions, and safe defaults.

Vibe discovers these skills automatically when run from this trusted repository. Load the relevant skill before adding or changing reusable workflows, composite actions, or CI helpers.
