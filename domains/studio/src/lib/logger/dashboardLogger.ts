import type { HydrationSnapshot } from '@/lib/hydration/types';

export interface LogEntry {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    data?: Record<string, unknown>;
}

export interface DashboardLoggerOptions {
    /**
     * Enable console output for development
     * @default process.env.NODE_ENV === 'development'
     */
    enableConsole?: boolean;
    /**
     * Custom log destination (for testing or file logging)
     */
    logDestination?: (entry: LogEntry) => void;
}

/**
 * Structured logger for dashboard telemetry.
 * Captures HydrationSnapshot payloads and other dashboard events
 * with correlation IDs for observability.
 */
class DashboardLogger {
    private options: Required<DashboardLoggerOptions>;
    private logBuffer: LogEntry[] = [];

    constructor(options: DashboardLoggerOptions = {}) {
        this.options = {
            enableConsole: options.enableConsole ?? process.env.NODE_ENV === 'development',
            logDestination: options.logDestination ?? this.defaultLogDestination.bind(this),
        };
    }

    /**
     * Log a hydration snapshot with structured telemetry
     */
    logHydrationSnapshot(snapshot: HydrationSnapshot): void {
        const entry: LogEntry = {
            timestamp: snapshot.timestamp,
            level: this.mapSeverityToLevel(snapshot.severity),
            message: `Hydration mismatch detected on ${snapshot.route}`,
            data: {
                type: 'hydration_snapshot',
                route: snapshot.route,
                correlationId: snapshot.correlationId,
                extensionFingerprint: snapshot.extensionFingerprint,
                serverAttributes: snapshot.serverAttributes,
                clientAttributes: snapshot.clientAttributes,
                severity: snapshot.severity,
            },
        };

        this.emit(entry);
    }

    /**
     * Log a generic dashboard event
     */
    log(level: LogEntry['level'], message: string, data?: Record<string, unknown>): void {
        const entry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
        };

        this.emit(entry);
    }

    /**
     * Get buffered logs (useful for testing)
     */
    getBufferedLogs(): LogEntry[] {
        return [...this.logBuffer];
    }

    /**
     * Clear buffered logs
     */
    clearBuffer(): void {
        this.logBuffer = [];
    }

    private emit(entry: LogEntry): void {
        // Buffer logs for testing/inspection
        this.logBuffer.push(entry);

        // Limit buffer size to prevent memory leaks
        if (this.logBuffer.length > 100) {
            this.logBuffer.shift();
        }

        // Send to destination
        this.options.logDestination(entry);
    }

    private defaultLogDestination(entry: LogEntry): void {
        if (!this.options.enableConsole) {
            return;
        }

        const prefix = `[Dashboard Logger] ${entry.timestamp}`;
        const logMethod = entry.level === 'error' ? console.error : entry.level === 'warn' ? console.warn : console.log;

        if (entry.data) {
            logMethod(`${prefix} [${entry.level.toUpperCase()}] ${entry.message}`, entry.data);
        } else {
            logMethod(`${prefix} [${entry.level.toUpperCase()}] ${entry.message}`);
        }
    }

    private mapSeverityToLevel(severity: HydrationSnapshot['severity']): LogEntry['level'] {
        switch (severity) {
            case 'error':
                return 'error';
            case 'warn':
                return 'warn';
            case 'info':
            default:
                return 'info';
        }
    }
}

// Singleton instance for the dashboard
let instance: DashboardLogger | null = null;

export function getDashboardLogger(options?: DashboardLoggerOptions): DashboardLogger {
    if (!instance) {
        instance = new DashboardLogger(options);
    }
    return instance;
}

export function resetDashboardLogger(): void {
    instance = null;
}
