# API Documentation Template

**Endpoint:** `[METHOD] /api/[resource]`  
**Version:** v1  
**Authentication:** [Required | Optional | None]  
**Last Updated:** [YYYY-MM-DD]  

---

## Overview

[Brief description of what this endpoint does]

**Related Endpoints:**
- [`GET /api/resource`](#get-apiresouce) - List resources
- [`POST /api/resource`](#post-apiresouce) - Create resource
- [`PUT /api/resource/:id`](#put-apiresourceid) - Update resource
- [`DELETE /api/resource/:id`](#delete-apiresourceid) - Delete resource

---

## Request

### Endpoint
```
[METHOD] /api/[resource]/[action]
```

### Headers
```
Content-Type: application/json
Authorization: Bearer [token] (if required)
X-Request-ID: [unique-id] (optional, for tracing)
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number for pagination (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |
| `sort` | string | No | Sort field (e.g., `created_at`, `-updated_at` for desc) |
| `filter` | string | No | Filter criteria (JSON encoded) |

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Resource ID |

### Request Body
```json
{
  "field1": "value1",
  "field2": 123,
  "nested_object": {
    "key": "value"
  }
}
```

**Field Descriptions:**
- `field1` (string, required) - Description of field1
- `field2` (integer, optional) - Description of field2 (default: 0)
- `nested_object` (object, optional) - Description of nested object

---

## Response

### Success Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "field1": "value1",
    "field2": 123,
    "created_at": "2025-12-09T10:30:00Z",
    "updated_at": "2025-12-09T10:30:00Z"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "timestamp": "2025-12-09T10:30:00Z"
  }
}
```

### Response Fields
- `status` (string) - Response status: "success", "error", "pending"
- `data` (object) - Response payload
- `meta` (object) - Metadata (pagination, timestamps, etc.)
- `error` (object, if error) - Error details with code and message

### Response Headers
```
Content-Type: application/json
X-Request-ID: [unique-id]
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1702200600
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required field: field1",
    "details": {
      "field": "field1",
      "reason": "required"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 429 Too Many Requests
```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 60
  }
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Examples

### Example 1: Create Resource
```bash
curl -X POST https://api.example.com/api/resource \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token123" \
  -d '{
    "name": "My Resource",
    "description": "A test resource"
  }'
```

**Response (201 Created):**
```json
{
  "status": "success",
  "data": {
    "id": "abc123def456",
    "name": "My Resource",
    "description": "A test resource",
    "created_at": "2025-12-09T10:30:00Z"
  }
}
```

### Example 2: Get Resource
```bash
curl -X GET https://api.example.com/api/resource/abc123def456 \
  -H "Authorization: Bearer token123"
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": "abc123def456",
    "name": "My Resource",
    "description": "A test resource",
    "created_at": "2025-12-09T10:30:00Z"
  }
}
```

---

## Rate Limiting

- **Limit:** 1,000 requests per hour
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Exceeded:** Returns 429 status with `Retry-After` header

---

## Pagination

Results are paginated with 20 items per page by default.

```bash
# Get page 2 with 50 items per page
GET /api/resource?page=2&limit=50
```

---

## Filtering & Sorting

### Sorting
```bash
# Sort by created_at ascending
GET /api/resource?sort=created_at

# Sort by created_at descending
GET /api/resource?sort=-created_at
```

### Filtering
```bash
# Filter by status
GET /api/resource?filter={"status":"active"}
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-12-09 | Initial release |
| v1.1 | [TBD] | [Changes planned] |

---

## SDK Support

- **JavaScript/TypeScript** - [npm package or URL]
- **Python** - [pip package or URL]
- **Go** - [Go module or URL]

---

## Testing

### Integration Tests
Located in `domains/studio/src/app/api/[resource]/__tests__/route.test.ts`

### E2E Tests
Located in `tests/e2e/api.spec.ts`

### How to Test Locally
```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Test with curl
curl http://localhost:3000/api/resource
```

---

## References

- **Spec Document:** [Link to feature spec]
- **Data Model:** [Link to models]
- **Related APIs:** [Links to related endpoints]
- **OpenAPI Schema:** [Link to openapi.yaml]

---

**Questions?** See [API Guidelines](../../docs/api-guidelines.md) or contact the backend team.
