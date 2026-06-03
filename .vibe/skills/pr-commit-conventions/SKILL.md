---
name: pr-commit-conventions
description: Use this before creating commits, pushing branches, or opening pull requests. Enforces repository-owner commit attribution, conventional commit messages, and clean PR metadata.
---

# PR and Commit Conventions

Use this skill before committing changes, pushing a branch, or opening a pull request.

## Commit attribution

1. Resolve the repository owner from the `origin` remote (`owner/repo`).
2. Create commits using the repository owner's Git identity when it is available for the repository.
3. Do not set an AI tool, bot, assistant, model, or vendor as the commit `Author`, `Committer`, or `Co-authored-by` trailer.
4. Do not add AI attribution trailers or generated-by footers, including variants such as:
   - `Co-authored-by: Claude ...`
   - `Co-authored-by: ChatGPT ...`
   - `Co-authored-by: OpenAI ...`
   - `Co-authored-by: Mistral ...`
   - `Generated with ...`
5. Before pushing, inspect the commit metadata and message to confirm the author, committer, and trailers comply.

## Commit messages

Use Conventional Commits:

```text
<type>(optional-scope): <short imperative summary>
```

Allowed common types include:

- `feat`: user-visible feature or capability
- `fix`: bug fix
- `chore`: maintenance that is not user-visible
- `docs`: documentation-only change
- `refactor`: code restructuring without behavior change
- `test`: tests only
- `ci`: CI workflow or automation change
- `build`: build system, packaging, or dependency metadata change
- `perf`: performance improvement
- `style`: formatting-only change
- `revert`: revert a prior change

Scopes are optional and may be used when they clarify the affected module, for example:

```text
feat(actions): add reusable release workflow
fix(lint): handle missing config
chore: update repository skills
```

Keep the subject concise, imperative, and lowercase after the type unless a proper noun is required.

## Pull requests

1. Use a branch name that identifies the task and is safe to push to the remote.
2. Keep the PR focused on the commits in the branch.
3. Write the PR title using the same Conventional Commit style as the primary commit when possible.
4. In the PR body, summarize the change and list verification commands run.
5. Do not add AI attribution, AI co-authoring notes, or generated-by statements to the PR title, body, labels, or comments.

## Pre-push checklist

- `git status` contains only intended changes.
- `git log -1 --format=fuller` shows a repository-owner human identity, not an AI identity.
- `git log -1 --format=%B` uses an allowed Conventional Commit type and has no AI attribution trailers.
- The PR title/body do not mention AI authorship or co-authorship.
