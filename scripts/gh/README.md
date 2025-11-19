# GH automation scripts

Small set of helper scripts to seed the repository with labels, issues and a project board. They are idempotent (check for existing labels and issues) to avoid duplication.

## Quick Start

**One command to set up everything:**

```bash
pnpm setup:gh:full
```

This will:
1. Create all labels
2. Create all 37 issues from backlog.md
3. Create the "EDUCACROSS Backlog" project board
4. Add issues to the project board (if permissions allow)

## Prerequisites

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate: `gh auth login` (token required with repo and project permissions)

## Individual Scripts

### 1. Create Labels

```bash
pnpm setup:gh:labels
# or
./scripts/gh/create-labels.sh
```

Creates standard labels:
- `epic` - For epic-level issues
- `priority:P0`, `priority:P1`, `priority:P2` - Priority levels
- `type:task` - Task type
- `documentation` - Documentation issues
- `domain:BackOffice`, `domain:FrontOffice`, `domain:Game` - Domain labels
- `tooling` - Tooling and infrastructure
- `status:backlog`, `status:in-progress`, `status:done` - Status labels

### 2. Create Issues

**Create ALL issues from backlog (37 issues):**

```bash
pnpm setup:gh:issues:all
# or
./scripts/gh/create-issues-all.sh
```

**Create only priority issues (original 17 issues):**

```bash
pnpm setup:gh:issues
# or
./scripts/gh/create-issues.sh
```

Issues are organized by Epic (A-H):
- **Epic A**: Tokens (5 issues)
- **Epic B**: Design System (7 issues)
- **Epic C**: Studio (5 issues)
- **Epic D**: Storybook (4 issues)
- **Epic E**: Jornadas (3 issues)
- **Epic F**: Tooling/Infra (4 issues)
- **Epic G**: Governança (3 issues)
- **Epic H**: Dashboard (6 issues)

### 3. Create Project Board

```bash
pnpm setup:gh:project
# or
./scripts/gh/create-project.sh
```

Creates "EDUCACROSS Backlog" project at owner level.

**Note**: After creation, you may need to manually add columns:
- Backlog
- In Progress
- Done

### 4. Add Issues to Project Board

```bash
pnpm setup:gh:add-issues-to-project
# or
./scripts/gh/add-issues-to-project.sh
```

Adds issues labeled with `status:backlog` to the "Backlog" column.

**Note**: This requires project permissions. If it fails, add issues manually via the GitHub UI.

## Custom Usage

All scripts accept the repository as an argument:

```bash
./scripts/gh/create-labels.sh owner/repo-name
./scripts/gh/create-issues-all.sh owner/repo-name
./scripts/gh/create-project.sh owner/repo-name
./scripts/gh/add-issues-to-project.sh owner/repo-name [project-title] [column-name] [label]
```

## Workflow

### Initial Setup

```bash
# Full automated setup
pnpm setup:gh:full
```

### After Setup

1. Visit your repository: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/issues
2. Review and adjust issues as needed
3. Visit the project board: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects
4. Configure columns if not automatic
5. Start working on P0 issues:
   - C1 - Studio: Persistência em disco
   - B1 - Design System: Componentes de formulário
   - D1 - Storybook: Página de Tokens
   - E1 - BackOffice: Revisão de Questões
   - F1 - ESLint unificado

## Troubleshooting

### "gh: command not found"
Install GitHub CLI: https://cli.github.com/

### "You are not logged into any GitHub hosts"
Run: `gh auth login`

### "Permission denied" or "Not Found" errors
- Make sure you have push access to the repository
- For project operations, you may need additional permissions
- Try adding issues to the project manually via GitHub UI

### Issues already exist
The scripts are idempotent - they check for existing issues by title and skip them.

### Project board operations fail
GitHub Projects v2 API permissions may be required. If automated adding fails, manually drag issues to the project board via the GitHub UI.

## Files

- `create-labels.sh` - Creates repository labels
- `create-issues.sh` - Creates priority issues (P0/P1)
- `create-issues-all.sh` - Creates ALL issues from backlog.md (37 total)
- `create-project.sh` - Creates project board
- `add-issues-to-project.sh` - Adds issues to project board
- `setup-github-full.sh` - Master script that runs all steps

## Notes

- Scripts use `gh` CLI and assume you have appropriate permissions
- Scripts are idempotent - safe to run multiple times
- Keep scripts executable: `chmod +x scripts/gh/*.sh`
- The `create-issues-all.sh` creates comprehensive issues with all subtasks
- Issues are created with appropriate labels for filtering and project management

## References

- GitHub CLI: https://cli.github.com/
- GitHub Projects: https://docs.github.com/en/issues/planning-and-tracking-with-projects
- Backlog: `docs/backlog.md`
- Issues List: `docs/issues-pendentes.md`
