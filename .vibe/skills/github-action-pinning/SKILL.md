---
name: github-action-pinning
description: Use this when creating or updating GitHub Actions workflows, reusable workflows, or composite actions. Ensures third-party actions use the latest release and are pinned by immutable commit SHA.
---

# GitHub Action Pinning

When editing any workflow or action that uses another GitHub Action:

1. Inventory every `uses:` entry you touch.
2. Classify each entry:
   - Local actions (`./...`) do not need SHA pinning.
   - Docker actions (`docker://...`) must use immutable digests when possible.
   - Repository actions (`owner/repo[/path]@ref`) must use commit SHA pins.
3. For each repository action, resolve the latest appropriate upstream version:
   - Prefer the latest stable GitHub release.
   - If no releases exist, use the latest semver tag.
   - If no tags exist, use the repository default branch HEAD.
4. Pin the action to the commit SHA for that version.
5. Preserve the human-readable version in a comment next to the pin.

Preferred format:

```yaml
- uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8 # v5.0.0
```

For actions with subpaths, pin the repository ref only:

```yaml
- uses: docker/setup-buildx-action@e468171a9de216ec08956ac3ada2f0791b6bd435 # v3.11.1
```

Before finishing:

- Verify no touched third-party action still points to a mutable ref such as `main`, `master`, or `v1`.
- Verify each pinned SHA is 40 lowercase hexadecimal characters.
- Verify the comment matches the release or tag that resolved to the SHA.
- Mention any action that could not be resolved or pinned, and why.
