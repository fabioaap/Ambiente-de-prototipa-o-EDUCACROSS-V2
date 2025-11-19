# GH automation scripts

Small set of helper scripts to seed the repository with labels, issues and a project board. They are idempotent (check for existing labels and issues) to avoid duplication.

How to use:

1. Ensure you are authenticated with the GitHub CLI: `gh auth login` (token required)
2. Run the labels script once:

```bash
./scripts/gh/create-labels.sh
```

3. Create issues from the backlog (idempotent):

```bash
./scripts/gh/create-issues.sh
```

4. Optional: create a Project board at owner level and review the columns:

```bash
./scripts/gh/create-project.sh
```

Notes:
- Scripts use `gh` and assume you have permission in the repository.
- The `create-issues.sh` script checks for existing issues by title before creating them.
- Keep scripts executable: `chmod +x scripts/gh/*.sh`.
