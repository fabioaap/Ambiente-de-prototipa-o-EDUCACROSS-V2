/**
 * Derives a fingerprint from attribute differences to group hydration incidents
 * by extension type (e.g., 'fusion-extension-loaded', 'darkreader', etc.)
 */
export function deriveExtensionFingerprint(
    serverAttributes: Record<string, string>,
    clientAttributes: Record<string, string>,
): string | undefined {
    // Get all unique attribute keys
    const allKeys = new Set([...Object.keys(serverAttributes), ...Object.keys(clientAttributes)]);

    // Find differences
    const differences: string[] = [];

    for (const key of allKeys) {
        const serverValue = serverAttributes[key];
        const clientValue = clientAttributes[key];

        // Attribute added on client
        if (!serverValue && clientValue) {
            differences.push(`+${key}`);
            continue;
        }

        // Attribute removed on client
        if (serverValue && !clientValue) {
            differences.push(`-${key}`);
            continue;
        }

        // Attribute value changed
        if (serverValue !== clientValue) {
            // For class attributes, extract extension-related tokens
            if (key === 'class' || key === 'className') {
                const serverTokens = new Set(serverValue.split(' ').filter(Boolean));
                const clientTokens = new Set(clientValue.split(' ').filter(Boolean));

                // Find tokens added by client
                for (const token of clientTokens) {
                    if (!serverTokens.has(token) && isExtensionToken(token)) {
                        differences.push(token);
                    }
                }
            } else {
                differences.push(`~${key}`);
            }
        }
    }

    // Return undefined if no differences (shouldn't happen in hydration mismatch)
    if (differences.length === 0) {
        return undefined;
    }

    // Sort for deterministic fingerprints
    return differences.sort().join(',');
}

/**
 * Checks if a token is likely from a browser extension
 */
function isExtensionToken(token: string): boolean {
    const extensionPatterns = [
        /extension/i,
        /fusion/i,
        /darkreader/i,
        /adguard/i,
        /ublock/i,
        /grammarly/i,
        /lastpass/i,
        /bitwarden/i,
        /metamask/i,
        /-ext-/i,
        /^ext-/i,
    ];

    return extensionPatterns.some((pattern) => pattern.test(token));
}

/**
 * Extracts attribute snapshot from an HTMLElement for comparison
 */
export function captureAttributeSnapshot(element: HTMLElement): Record<string, string> {
    const snapshot: Record<string, string> = {};

    // Capture standard attributes
    Array.from(element.attributes).forEach((attr) => {
        snapshot[attr.name] = attr.value;
    });

    // Normalize className to class for consistency
    if (snapshot.className && !snapshot.class) {
        snapshot.class = snapshot.className;
        delete snapshot.className;
    }

    return snapshot;
}
