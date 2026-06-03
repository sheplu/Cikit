---
name: dogfood-reusable-action
description: Use this when adding or changing a reusable workflow, composite action, or CI helper. Ensures the repository includes a practical example that exercises the same public interface consumers will use.
---

# Dogfood Reusable Actions

Every reusable action or workflow change must include a dogfood path that proves the public use case works.

When creating or updating a reusable workflow or composite action:

1. Identify the consumer-facing interface:
   - `workflow_call` inputs, secrets, outputs, and permissions for reusable workflows.
   - `inputs`, `outputs`, and runtime assumptions for composite actions.
2. Add or update a repository workflow under `.github/workflows/` that calls the reusable workflow or action through that public interface.
3. Keep the dogfood workflow small and realistic:
   - Use a minimal fixture project or temporary files created during the job.
   - Exercise required inputs and at least one representative optional input.
   - Validate expected outputs or side effects with explicit shell assertions.
4. Prefer local dogfooding for in-repository development:
   - Reusable workflow: `uses: ./.github/workflows/<workflow>.yml`
   - Composite action: `uses: ./path/to/action`
5. If GitHub requires remote invocation for the scenario, call the repository action/workflow from the task branch and document why local invocation is not enough.

Before finishing:

- Run the closest local validation available for the dogfood path.
- If the behavior only runs on GitHub, ensure the workflow can be triggered with `workflow_dispatch` or by pull request.
- Report exactly which dogfood workflow exercises the changed reusable action or workflow.
