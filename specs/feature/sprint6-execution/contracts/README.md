# Contracts (Phase 1)

Spec: Export/Import JSON/XML/CSV (US2.5) + observabilidade

## OpenAPI (excerpt)

```yaml
openapi: 3.1.0
info:
	title: Sprint6 Export/Import & Telemetry
	version: 1.0.0
paths:
	/api/export:
		post:
			summary: Export data in CSV, JSON, or XML
			requestBody:
				required: true
				content:
					application/json:
						schema:
							$ref: '#/components/schemas/DataExportRequest'
			responses:
				'200':
					description: Export successful
					content:
						application/octet-stream:
							schema:
								type: string
								format: binary
				'400':
					description: Validation errors
					content:
						application/json:
							schema:
								$ref: '#/components/schemas/ValidationErrorList'
	/api/import:
		post:
			summary: Import data in CSV, JSON, or XML with schema validation
			requestBody:
				required: true
				content:
					multipart/form-data:
						schema:
							type: object
							properties:
								format:
									type: string
									enum: [csv, json, xml]
								schemaVersion:
									type: string
								file:
									type: string
									format: binary
							required: [format, schemaVersion, file]
			responses:
				'200': { description: Import accepted }
				'400':
					description: Validation errors
					content:
						application/json:
							schema:
								$ref: '#/components/schemas/ValidationErrorList'
	/api/health:
		get:
			summary: Health and telemetry for dashboards
			responses:
				'200':
					description: Health snapshot
					content:
						application/json:
							schema:
								$ref: '#/components/schemas/Health'

components:
	schemas:
		DataExportRequest:
			type: object
			properties:
				format:
					type: string
					enum: [csv, json, xml]
				schemaVersion:
					type: string
				filters:
					type: object
					additionalProperties: { type: string }
			required: [format, schemaVersion]
		ValidationError:
			type: object
			properties:
				field: { type: string }
				message: { type: string }
				line: { type: integer, minimum: 1 }
			required: [field, message]
		ValidationErrorList:
			type: object
			properties:
				errors:
					type: array
					items: { $ref: '#/components/schemas/ValidationError' }
		Health:
			type: object
			properties:
				status: { type: string, enum: [ok, degraded, fail] }
				ci:
					type: object
					properties:
						workflow: { type: string }
						lastRunStatus: { type: string }
						durationMs: { type: integer, minimum: 0 }
				coverage:
					type: object
					properties:
						unit: { type: number, minimum: 0, maximum: 100 }
						e2e: { type: number, minimum: 0, maximum: 100 }
				sentry:
					type: object
					properties:
						dsnPresent: { type: boolean }
						alertsPerHour: { type: number, minimum: 0 }
				analytics:
					type: object
					properties:
						provider: { type: string, enum: [ga4, mixpanel, none] }
						lastEventTs: { type: string, format: date-time }
			required: [status]
```

## Notes
- JSON e XML devem seguir `schemaVersion`; XML validado via XSD correspondente.
- Source maps devem ser enviados no build para correlação de Sentry.
- Sem PII em payloads de analytics ou logs.
