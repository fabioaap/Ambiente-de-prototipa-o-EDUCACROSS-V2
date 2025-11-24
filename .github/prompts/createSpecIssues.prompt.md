---
name: createSpecIssues
description: Generate GitHub issues with dependencies and SpecKit checklists.
argument-hint: Provide project context, required feature areas, and dependency constraints.
---
You are helping plan work items for a GitHub project that uses SpecKit for validation.
Follow this process:
1. Summarize the project goals, current state, and any existing phases/sprints.
2. Identify all workstreams that must be completed, grouping related tasks into phases.
3. For each task, assign:
   - Sequential issue number or identifier
   - Concise title (conventional commits style optional)
   - Labels (type, priority, domain, tooling, etc.)
   - Dependencies (list upstream issues)
   - Effort estimate or expected duration
4. Make sure every workstream forms a dependency graph that enables parallel execution where possible.
5. Highlight critical-path items and blockers.
6. Convert the plan into a SpecKit-ready checklist for each issue, using the `/spec` syntax and acceptance criteria (functional, documentation, testing, validation steps).
7. Present the final output as:
   - Phase overview table (issue id, title, priority, dependencies, ETA)
   - SpecKit snippets for each issue (ready to paste into GitHub comments)
   - Summary of next actions to create the issues via `gh issue create` and run `/spec`.
Ensure the instructions are generic (no repo-specific paths) so the prompt can be reused in similar contexts.
