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

5. Add issues to a Project board (Backlog column):

```bash
./scripts/gh/add-issues-to-project.sh  # defaults: fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2, "EDUCACROSS Backlog", "Backlog", "status:backlog"
```

The script will try to locate the project and column and add cards for issues labeled `status:backlog`. If your token does not have project scope, run the commands locally with an appropriate token or add the cards via the Project UI.

Notes:
- Scripts use `gh` and assume you have permission in the repository.
- The `create-issues.sh` script checks for existing issues by title before creating them.
- Keep scripts executable: `chmod +x scripts/gh/*.sh`.
