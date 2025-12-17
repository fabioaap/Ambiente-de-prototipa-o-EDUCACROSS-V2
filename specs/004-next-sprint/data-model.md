# Data Model — Next Sprint

## Entities
- KPI: id, name, value, delta, trend, updatedAt
- HealthMetric: id, name, status (ok/warn/fail), message, updatedAt
- Page: id, title, slug, status, owner, createdAt, updatedAt

## Relations
- DashboardSummary aggregates KPI and HealthMetric.
- Pages support pagination and CSV import/export.
