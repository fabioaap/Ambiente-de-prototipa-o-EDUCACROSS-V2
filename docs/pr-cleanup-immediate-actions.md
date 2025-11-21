# PR Cleanup - Immediate Action Plan

## ⚠️ IMPORTANT: Manual Intervention Required

**Copilot Agent Cannot**: Directly merge PRs due to GitHub authentication limitations

**Repository Owner Must**: Execute merge commands via GitHub CLI or web interface

---

## 🎯 Quick Start: Merge P0 PRs (Critical Path)

### Step 1: Merge PR #30 (CRITICAL - Blocks All Other Work)

**Problem**: PR #30 targets wrong branch (copilot/implement-advanced-features instead of main)

**Solution**:
```bash
# 1. Fetch latest
git fetch --all

# 2. Checkout PR branch
git checkout copilot/implement-c1-b1-form-components
git pull

# 3. Rebase onto main
git rebase origin/main

# If conflicts, resolve them, then:
git rebase --continue

# 4. Test critical fix
pnpm install
pnpm build
pnpm dev:studio  # MUST start without route conflict error

# 5. Force push rebased branch
git push --force-with-lease

# 6. Update PR target to main via GitHub UI:
# Visit: https://github.com/fabioaap/Ambiente-de-prototipa-o-EDUCACROSS-V2/pull/30
# Click "Edit" next to base branch
# Change from "copilot/implement-advanced-features" to "main"

# 7. Merge via GitHub UI or CLI:
gh pr merge 30 --merge --delete-branch
```

**Expected Outcome**: Studio starts successfully, route conflict resolved

**Issues to Close After Merge**:
- #1 (C1 - Studio persistence)
- #2 (B1 - Form components)
- #3 (D1 - Tokens page)
- #5 (F1 - ESLint config)

---

### Step 2: Merge PR #28 (Completes Sprint 1)

**Dependencies**: Wait for PR #30 to merge first

```bash
# 1. After PR #30 is merged, fetch latest main
git fetch origin
git checkout main
git pull

# 2. Checkout PR #28
git checkout copilot/review-issues-and-accessibility
git pull

# 3. Rebase onto updated main
git rebase origin/main

# If conflicts (likely with DS changes), resolve and:
git rebase --continue

# 4. Test all new components
pnpm install
pnpm build
pnpm dev:studio
pnpm dev:storybook

# Verify in Storybook:
# - Toolbar component renders
# - StatusBadge shows all variants
# - ConfirmDialog has accessibility features

# 5. Force push rebased branch
git push --force-with-lease

# 6. Merge
gh pr merge 28 --merge --delete-branch
```

**Expected Outcome**: Sprint 1 100% complete with all P0 + Epic E1 done

**Issue to Close After Merge**:
- #4 (E1 - BackOffice: Revisão de Questões)

---

## 📋 After P0 Merges: Update Documentation

```bash
# Update backlog to reflect 100% Sprint 1 completion
vim docs/backlog.md
# Change Sprint 1 status from 80% to 100%
# Mark E1 as complete
# Update "Concluídos tecnicamente" section

# Update issues tracking
vim docs/issues-pendentes.md
# Remove closed issues (#1, #2, #3, #4, #5)
# Update counts

# Commit documentation updates
git add docs/backlog.md docs/issues-pendentes.md
git commit -m "docs: mark Sprint 1 100% complete after PR merges"
git push
```

---

## 🚀 Phase 2: Infrastructure PRs (Optional but Recommended)

### PR #27: GitHub Actions CI/CD

```bash
# Rebase to main
git checkout feature/f3-github-actions
git rebase origin/main
git push --force-with-lease

# Update base branch to main in GitHub UI
# Merge
gh pr merge 27 --merge --delete-branch
```

### PR #26: Deployment Infrastructure

```bash
# Wait for PR #27 to merge (if merging both)
# Rebase to main
git checkout copilot/deploy-v02-beta-to-staging-again
git rebase origin/main

# Update version numbers if needed
# Test vercel.json configs are valid
pnpm build

git push --force-with-lease
gh pr merge 26 --merge --delete-branch
```

### Close PR #21 (Duplicate of #26)

```bash
gh pr close 21 --comment "Closing as duplicate of PR #26. Deployment infrastructure will be merged via #26. Sprint 3 planning docs can be extracted separately if needed."
```

### Close PR #20 (Superseded by #28)

```bash
gh pr close 20 --comment "Closing as superseded by PR #28. Sprint 1 (E1) completed in #28. CI/CD workflow merged via #27."
```

---

## 📚 Phase 3: Documentation PRs (Low Risk)

### PR #22: QA Testing Documentation

```bash
# Can merge anytime - no conflicts expected
git checkout copilot/test-dashboard-flows-users
git rebase origin/main  # Just to be current
pnpm build  # Verify no build issues

git push --force-with-lease
gh pr merge 22 --merge --delete-branch
```

### PR #24: Docs Sync

```bash
# Check if already outdated
git checkout copilot/list-pending-issues
git log  # Review what was changed

# If outdated/superseded:
gh pr close 24 --comment "Closing as docs/backlog.md and docs/issues-pendentes.md have been updated directly on main."

# If still relevant:
git rebase origin/main
git push --force-with-lease
gh pr merge 24 --merge --delete-branch
```

### PR #19: Open Issues Tracking

```bash
# Check for duplication with docs/issues-pendentes.md
# If duplicate:
gh pr close 19 --comment "Closing as duplicate. docs/issues-pendentes.md already provides this tracking."

# If unique content, extract and add to existing docs
```

---

## 🔧 Phase 4: Automation Scripts (Nice to Have)

### PR #18: Bulk PR Approval Script

```bash
git checkout copilot/approve-prs-in-batch
git rebase origin/main
git push --force-with-lease

# Test script
chmod +x scripts/gh/approve-prs-batch.sh
./scripts/gh/approve-prs-batch.sh --help

gh pr merge 18 --merge --delete-branch
```

### PR #29: Issue Closure Automation

```bash
# After all P0 PRs merged and issues closed
git checkout copilot/update-in-progress-issues
git rebase origin/main

# Update scripts to reflect actual closed issues
# Test scripts

git push --force-with-lease
gh pr merge 29 --merge --delete-branch
```

---

## ✅ Validation Checklist

After each merge, verify:

```bash
# 1. Main branch builds
git checkout main
git pull
pnpm install
pnpm build

# 2. Lint passes
pnpm lint

# 3. Type check passes
pnpm -r type-check

# 4. Dev servers start
pnpm dev:studio  # http://localhost:3000
pnpm dev:storybook  # http://localhost:6006

# 5. No console errors in browser
# Open both URLs and check browser console
```

---

## 🎯 Definition of Done

**Sprint 1 Complete** when:
- [ ] PR #30 merged
- [ ] PR #28 merged
- [ ] Issues #1, #2, #3, #4, #5 closed
- [ ] docs/backlog.md shows Sprint 1 at 100%
- [ ] docs/issues-pendentes.md updated
- [ ] Main branch builds successfully
- [ ] Studio starts without errors
- [ ] Storybook displays all components

**Full Cleanup Complete** when:
- [ ] All above ✅
- [ ] PRs #27, #26 merged (CI/CD + deployment)
- [ ] PRs #20, #21 closed as duplicates
- [ ] PR #22 merged (QA docs)
- [ ] PRs #18, #19, #24, #29 merged or closed with rationale
- [ ] v0.2-beta tagged
- [ ] CHANGELOG.md updated

---

## ⏱️ Estimated Timeline

- **P0 PRs (#30, #28)**: 2-3 hours (includes testing)
- **Infrastructure PRs (#27, #26)**: 1-2 hours
- **Documentation PRs (#22, #24, #19)**: 1 hour
- **Automation PRs (#18, #29)**: 1 hour
- **Cleanup & Validation**: 30 minutes

**Total**: 4-6 hours of focused work

---

## 🆘 Troubleshooting

### If PR #30 has merge conflicts:
```bash
# Most likely conflicts: package.json, pnpm-lock.yaml
git checkout --ours package.json  # Or resolve manually
pnpm install  # Regenerate lockfile
git add package.json pnpm-lock.yaml
git rebase --continue
```

### If Studio won't start after PR #30:
```bash
# Check route configuration
ls -la apps/studio/src/app/
# Should see:
# - page.tsx (root route)
# - [...slug]/page.tsx (catch-all)
# NOT [[...slug]]/page.tsx (optional catch-all - THIS IS THE BUG)

# If still broken, compare with PR #30 changes
```

### If build fails after merge:
```bash
# Clear all build artifacts
pnpm clean  # If script exists
# Or manually:
find . -name "dist" -type d -exec rm -rf {} +
find . -name "node_modules" -type d -exec rm -rf {} +

# Reinstall and rebuild
pnpm install
pnpm build
```

---

## 📞 Need Help?

If any step fails:
1. Check docs/pr-cleanup-analysis.md for detailed PR analysis
2. Review PR description for specific implementation details
3. Test changes in isolation before merging
4. Ask for clarification on ambiguous PRs

---

**Last Updated**: 2025-11-21 16:13 UTC
**Status**: Ready for execution
**Next Action**: Merge PR #30 (CRITICAL)
