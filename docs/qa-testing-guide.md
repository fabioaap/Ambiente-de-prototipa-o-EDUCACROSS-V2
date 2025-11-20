# 🧪 QA Testing Guide - Dashboard Flows v0.2-beta

**Version:** 0.2.0-beta  
**Environment:** Staging  
**Focus:** Dashboard flows and user journeys

---

## 📋 Overview

This guide provides comprehensive testing procedures for the EDUCACROSS v0.2-beta staging deployment, with emphasis on Dashboard functionality and user journey validation.

### Testing Objectives

1. **Functional Validation:** Ensure all features work as designed
2. **User Experience:** Validate flows are intuitive and bug-free
3. **Accessibility:** Verify WCAG 2.1 Level AA compliance
4. **Performance:** Confirm acceptable load times and responsiveness
5. **Data Integrity:** Verify API data consistency

---

## 🎯 Test Scope

### In Scope
- ✅ Dashboard API endpoints
- ✅ Studio page navigation
- ✅ Three complete journeys (BackOffice, FrontOffice, Game)
- ✅ Component functionality in Storybook
- ✅ Form interactions
- ✅ Accessibility features

### Out of Scope
- ❌ Production deployment
- ❌ Load testing (not applicable for prototypes)
- ❌ Security penetration testing
- ❌ Backend integration (using mock data)

---

## 👥 Test Participants

### Roles and Responsibilities

| Role | Responsibility | Time Commitment |
|------|----------------|-----------------|
| **QA Lead** | Coordinate testing, track issues | 4-6 hours |
| **Product Manager** | Validate business flows | 2-3 hours |
| **Designer** | UX/UI validation | 2-3 hours |
| **Developer** | Technical validation | 2-3 hours |
| **End User (optional)** | Real-world feedback | 1 hour |

---

## 🧪 Test Scenarios

### 1. Dashboard API Testing

**Endpoint:** `GET /api/dashboard/pages`

**Test Cases:**

#### TC1.1 - Basic API Response
```bash
# Request
curl -X GET https://studio-staging.educacross.com/api/dashboard/pages

# Expected Response
{
  "pages": [
    {
      "id": "...",
      "title": "...",
      "domain": "BackOffice|FrontOffice|Game",
      "path": "...",
      "lastModified": "..."
    }
  ],
  "total": <number>,
  "domains": {
    "BackOffice": <count>,
    "FrontOffice": <count>,
    "Game": <count>
  }
}
```

**Validation:**
- [ ] Status code is 200
- [ ] Response is valid JSON
- [ ] All required fields present
- [ ] `total` matches array length
- [ ] Domain counts are accurate

#### TC1.2 - Empty State
**Scenario:** Fresh deployment with no pages
- [ ] Returns empty array
- [ ] `total` is 0
- [ ] Domain counts are all 0

#### TC1.3 - Error Handling
**Scenario:** Simulate file system errors
- [ ] Returns appropriate error status (500)
- [ ] Error message is descriptive

---

### 2. Studio Navigation

#### TC2.1 - Homepage Load
**URL:** `/`

**Steps:**
1. Navigate to staging URL
2. Wait for page load

**Expected Results:**
- [ ] Page loads within 3 seconds
- [ ] No JavaScript errors in console
- [ ] All static assets load (CSS, images)
- [ ] Navigation links visible and functional

#### TC2.2 - Studio Editor Load
**URL:** `/studio`

**Steps:**
1. Navigate to `/studio`
2. Wait for Puck editor to initialize

**Expected Results:**
- [ ] Editor interface renders
- [ ] Component palette visible on right
- [ ] Canvas area visible in center
- [ ] Toolbar visible at top
- [ ] No console errors

#### TC2.3 - Sidebar Page List
**Location:** Studio editor sidebar

**Steps:**
1. Open Studio editor
2. Locate sidebar with page list
3. Verify all domains appear

**Expected Results:**
- [ ] Sidebar displays list of pages
- [ ] Pages grouped by domain (BackOffice, FrontOffice, Game)
- [ ] Each page shows title and last modified date
- [ ] Click on page navigates to it

---

### 3. Journey Testing: BackOffice

**Journey:** Revisão de Questões (Question Review)

#### TC3.1 - List Page
**URL:** `/backoffice/revisao-questoes/lista`

**Steps:**
1. Navigate to list page
2. Review layout and content

**Expected Results:**
- [ ] Page loads successfully
- [ ] List of questions displays
- [ ] Each item shows: ID, title, status, date
- [ ] Status badges color-coded correctly
- [ ] Click on item navigates to detail page

#### TC3.2 - Detail Page
**URL:** `/backoffice/revisao-questoes/detalhe`

**Steps:**
1. Navigate from list to detail
2. Review question details

**Expected Results:**
- [ ] Page loads with question data
- [ ] All sections visible: question text, metadata, actions
- [ ] Action buttons functional (Aprovar, Rejeitar, Editar)
- [ ] Back navigation works
- [ ] No layout issues on mobile

#### TC3.3 - Form Interactions
**Component:** Form inputs (Input, Select, Radio, Checkbox)

**Steps:**
1. Interact with various form elements
2. Test validation

**Expected Results:**
- [ ] Input fields accept text
- [ ] Select dropdowns open and close
- [ ] Radio buttons select/deselect
- [ ] Checkboxes toggle
- [ ] Required field validation works
- [ ] Error messages display correctly

---

### 4. Journey Testing: FrontOffice

**Journey:** Onboarding do Aluno (Student Onboarding)

#### TC4.1 - Welcome Screen
**URL:** `/frontoffice/onboarding/boas-vindas`

**Steps:**
1. Navigate to onboarding start
2. Review welcome screen

**Expected Results:**
- [ ] Welcome message displays
- [ ] Call-to-action button visible
- [ ] Friendly emoji/icon present
- [ ] Mobile-responsive layout

#### TC4.2 - Profile Setup
**URL:** `/frontoffice/onboarding/perfil-inicial`

**Steps:**
1. Progress from welcome to profile
2. Fill in profile information

**Expected Results:**
- [ ] Form fields render correctly
- [ ] Avatar upload area visible (even if non-functional)
- [ ] Progress indicator shows step 2/4
- [ ] "Next" and "Back" buttons work

#### TC4.3 - Tutorial/Walkthrough
**URL:** `/frontoffice/onboarding/tutorial`

**Steps:**
1. Complete profile and proceed
2. View tutorial content

**Expected Results:**
- [ ] Tutorial steps display
- [ ] Navigation through steps works
- [ ] Skip option available
- [ ] Completion leads to next step

#### TC4.4 - Completion
**URL:** `/frontoffice/onboarding/concluido`

**Steps:**
1. Complete all onboarding steps
2. View completion screen

**Expected Results:**
- [ ] Success message displays
- [ ] Link to main app/dashboard visible
- [ ] Celebratory UI element (emoji, animation)

---

### 5. Journey Testing: Game

**Journey:** Missões da Ilha 1 (Island 1 Missions)

#### TC5.1 - Island Map
**URL:** `/game/missoes-ilha-1/mapa`

**Steps:**
1. Navigate to game map
2. Review island layout

**Expected Results:**
- [ ] Map displays with mission nodes
- [ ] Some missions locked, some unlocked
- [ ] Visual indicators for status (completed, active, locked)
- [ ] Click on unlocked mission navigates to it

#### TC5.2 - Active Mission
**URL:** `/game/missoes-ilha-1/missao-ativa`

**Steps:**
1. Click on an active mission
2. Review mission details

**Expected Results:**
- [ ] Mission description displays
- [ ] Objectives listed
- [ ] Progress indicator shows completion %
- [ ] Action button (Start/Continue) visible
- [ ] Reward preview visible

#### TC5.3 - Achievements/Badges
**URL:** `/game/missoes-ilha-1/conquistas`

**Steps:**
1. Navigate to achievements screen
2. Review earned badges

**Expected Results:**
- [ ] Grid of badges displays
- [ ] Earned badges highlighted
- [ ] Locked badges shown in grayscale
- [ ] Click on badge shows details
- [ ] Point total displayed

---

### 6. Storybook Component Testing

**URL:** Storybook staging URL

#### TC6.1 - Catalog Navigation
**Steps:**
1. Open Storybook
2. Navigate through component categories

**Expected Results:**
- [ ] All components listed in sidebar
- [ ] Categories organized logically
- [ ] Search functionality works

#### TC6.2 - Button Component
**Story:** Button → All Variants

**Test Matrix:**

| Variant | Size | State | Expected |
|---------|------|-------|----------|
| Primary | sm | default | Blue, small |
| Primary | md | default | Blue, medium |
| Primary | lg | default | Blue, large |
| Secondary | md | default | Gray, medium |
| Outline | md | default | Border only |
| Ghost | md | default | Transparent |
| Primary | md | hover | Darker blue |
| Primary | md | disabled | Grayed out |

**Validation:**
- [ ] All variants render correctly
- [ ] Hover states work
- [ ] Disabled state prevents clicks
- [ ] Focus visible on keyboard navigation

#### TC6.3 - Form Components

**Components to test:**
- Input (text, email, password, number)
- Select (single, with groups)
- Checkbox (single, group)
- Radio (group)
- Switch

**Validation for each:**
- [ ] All states render (default, focus, error, disabled)
- [ ] Play functions execute correctly
- [ ] Accessibility tab shows no critical issues
- [ ] Keyboard navigation works
- [ ] Labels and help text display

#### TC6.4 - Tokens Page
**Story:** Design System → Tokens

**Steps:**
1. Navigate to Tokens page
2. Review all token categories

**Expected Results:**
- [ ] Colors display with hex values
- [ ] Typography samples render
- [ ] Spacing scale visible
- [ ] Border radius examples shown
- [ ] Shadow examples visible
- [ ] Copy code functionality works

#### TC6.5 - Accessibility Addon
**Location:** Storybook → Accessibility tab (bottom panel)

**Steps:**
1. Open any component story
2. Open Accessibility tab
3. Review violations

**Expected Results:**
- [ ] Addon loads without errors
- [ ] Violations tab shows issues (if any)
- [ ] Passes tab shows successful checks
- [ ] Each issue has description and location
- [ ] Severity levels indicated (minor, moderate, serious, critical)

---

## ♿ Accessibility Testing

### WCAG 2.1 Level AA Checklist

#### Visual
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Color contrast ≥ 3:1 for large text (18pt+)
- [ ] No information conveyed by color alone
- [ ] Text resizable up to 200% without loss of functionality

#### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Focus indicator visible on all focusable elements
- [ ] Logical tab order
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space activates buttons

#### Screen Reader
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] ARIA roles used appropriately
- [ ] Landmark regions defined
- [ ] Heading hierarchy correct (h1 → h2 → h3)

### Testing Tools

**Automated:**
- Storybook Addon A11y (already integrated)
- Lighthouse (Chrome DevTools)
- axe DevTools browser extension

**Manual:**
- Tab through all pages
- Test with screen reader (NVDA, JAWS, or VoiceOver)
- Zoom to 200% and verify layout

---

## 📊 Performance Testing

### Metrics to Measure

Use Lighthouse in Chrome DevTools:

**Studio Homepage:**
- [ ] Performance score ≥ 80
- [ ] Accessibility score = 100
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 80

**Storybook:**
- [ ] Performance score ≥ 75 (acceptable for dev tools)
- [ ] Accessibility score = 100

### Load Time Targets

| Page | Target | Acceptable |
|------|--------|------------|
| Studio Homepage | < 2s | < 3s |
| Studio Editor | < 3s | < 5s |
| Journey Pages | < 2s | < 3s |
| Storybook | < 2s | < 4s |

---

## 🐛 Bug Reporting

### Bug Template

```markdown
**Title:** [Component/Page] Brief description

**Environment:** Staging v0.2-beta

**Severity:** 
- [ ] Critical (blocker)
- [ ] High (major functionality)
- [ ] Medium (minor functionality)
- [ ] Low (cosmetic)

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
[Description]

**Actual Behavior:**
[Description]

**Screenshots:**
[Attach if applicable]

**Browser/Device:**
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080

**Additional Context:**
[Any other relevant information]
```

### Where to Report

- **GitHub Issues:** Create issue with label `bug` + `staging`
- **Priority Labels:** `priority:P0`, `priority:P1`, `priority:P2`
- **Component Labels:** `design-system`, `studio`, `storybook`, `api`

---

## ✅ Test Completion Checklist

### Before Starting
- [ ] Staging environment accessible
- [ ] Test accounts created (if needed)
- [ ] Browser/device matrix defined
- [ ] Bug tracking ready

### During Testing
- [ ] All test scenarios executed
- [ ] Results documented
- [ ] Bugs filed with proper severity
- [ ] Screenshots captured for issues

### After Testing
- [ ] Test summary report created
- [ ] Critical bugs communicated to dev team
- [ ] Sign-off obtained from stakeholders
- [ ] Feedback consolidated for Sprint 3

---

## 📈 Test Summary Template

```markdown
# QA Test Summary - v0.2-beta Staging

**Date:** [Date]
**Tester:** [Name]
**Duration:** [Hours]

## Overall Status
- [ ] Pass (ready for user testing)
- [ ] Pass with Minor Issues (proceed with caution)
- [ ] Fail (critical issues found)

## Test Execution
- Total Test Cases: [Number]
- Passed: [Number]
- Failed: [Number]
- Blocked: [Number]
- Not Executed: [Number]

## Critical Findings
1. [Issue description]
2. [Issue description]

## Recommendations
- [Recommendation 1]
- [Recommendation 2]

## Sign-off
- [ ] QA Lead approval
- [ ] Product Manager approval
```

---

## 🔄 Re-testing After Fixes

If bugs are fixed during staging:

1. **Deploy Hotfix:** Push updated code to staging
2. **Regression Test:** Re-run affected test scenarios
3. **Smoke Test:** Quick check of major flows
4. **Update Summary:** Note fixes in test report

---

## 📞 Support During Testing

**Questions:** Create GitHub Discussion
**Urgent Issues:** Tag `@fabioaap` in issue
**Documentation:** See `docs/deployment-guide.md`

---

**Document Status:** ✅ Ready for QA  
**Last Updated:** 2025-11-20  
**Next Review:** After first round of testing
