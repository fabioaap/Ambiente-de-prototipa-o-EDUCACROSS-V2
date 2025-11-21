# Script: Close Completed Issues

## Purpose

This script automatically closes completed P0 issues (#1, #2, #3, #5) that have been verified as implemented and tested.

## When to Use

Run this script when:
- ✅ All P0 implementations have been verified
- ✅ Build passes (`pnpm build`)
- ✅ Lint passes (`pnpm lint`)
- ✅ Manual testing confirms functionality
- ✅ Documentation is up to date

## What It Does

The script will:

1. **Update Issue Labels**
   - Remove `status:backlog` label
   - Add `status:done` label

2. **Close Issues with Detailed Comments**
   - Issue #1 (C1): Studio Persistence API
   - Issue #2 (B1): Form Components
   - Issue #3 (D1): Tokens Page
   - Issue #5 (F1): ESLint Config

3. **Add Verification Details**
   - Build status
   - Lint status
   - Implementation details
   - File locations
   - Current git commit

## Prerequisites

1. **Install GitHub CLI**
   ```bash
   # macOS
   brew install gh
   
   # Linux
   sudo apt install gh
   
   # Or download from: https://cli.github.com/
   ```

2. **Authenticate**
   ```bash
   gh auth login
   ```
   
   You'll need a token with `repo` permissions.

## Usage

```bash
# Make sure you're in the repository root
cd /path/to/Ambiente-de-prototipa-o-EDUCACROSS-V2

# Run the script
./scripts/close-completed-issues.sh
```

## Expected Output

```
==========================================
Closing Completed P0 Issues
Repository: fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2
==========================================

✅ GitHub CLI authenticated

📝 Closing issue #1: C1 - Studio: Persistência em disco (API)
✅ Issue #1 closed

📝 Closing issue #2: B1 - Design System: Componentes de formulário
✅ Issue #2 closed

📝 Closing issue #3: D1 - Storybook: Página de Tokens (visual)
✅ Issue #3 closed

📝 Closing issue #5: F1 - Tooling/Infra: ESLint unificado para monorepo
✅ Issue #5 closed

==========================================
✅ Script completed
==========================================

Next steps:
1. Review closed issues on GitHub
2. Update docs/backlog.md with new status
3. Verify project board columns are updated
4. Continue with remaining P1 issues

Project board: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
```

## Verification

After running the script:

1. **Check GitHub Issues**
   ```bash
   gh issue list --state closed --limit 5
   ```

2. **Verify Labels**
   - Each closed issue should have `status:done` label
   - `status:backlog` should be removed

3. **Check Project Board**
   - Visit: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/projects/3
   - Verify "In Progress" column is empty
   - Verify closed issues moved to "Done"

## Troubleshooting

### "gh: command not found"
Install GitHub CLI from https://cli.github.com/

### "Not authenticated"
Run: `gh auth login`

### "Permission denied"
Ensure your GitHub token has `repo` permissions:
1. Go to: https://github.com/settings/tokens
2. Create new token with `repo` scope
3. Run: `gh auth login` again

### "Issue already closed"
That's fine - the script will skip already closed issues.

### "Could not update labels"
This can happen due to permission issues. Issues will still close, but labels won't update. You can manually add the `status:done` label via GitHub UI.

## Manual Alternative

If you prefer to close issues manually:

```bash
# Close issue #1
gh issue close 1 --repo fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2 \
  --comment "✅ Verified and complete"

# Update labels
gh issue edit 1 --repo fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2 \
  --remove-label "status:backlog" --add-label "status:done"
```

## Related Files

- **Verification Report**: `docs/project-status-2025-11-21.md`
- **Backlog**: `docs/backlog.md`
- **Issues List**: `docs/issues-pendentes.md`

## Notes

- Script is **idempotent** - safe to run multiple times
- Already closed issues will be skipped
- Script includes current git commit in comments
- All actions are logged to console

## Support

If you encounter issues:
1. Check GitHub CLI installation: `gh --version`
2. Check authentication: `gh auth status`
3. Review error messages carefully
4. Try manual closure if script fails

---

**Last Updated**: 2025-11-21  
**Maintainer**: EDUCACROSS Team
