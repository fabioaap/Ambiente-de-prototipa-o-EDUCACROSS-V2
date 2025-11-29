const DEFAULT_LANG = 'pt-BR';
const DEFAULT_THEME = 'dark';
const BASE_CLASS_SEQUENCE = ['bg-neutral-950', 'text-neutral-50'];
const DEFAULT_ALLOWED_CLASSNAMES = new Set(BASE_CLASS_SEQUENCE);
const DEFAULT_BLOCKLIST: RegExp[] = [/(?:^|-)extension(?:-|$)/i, /fusion/i, /darkreader/i, /ublock/i, /adguard/i];

export interface NormalizeRootAttributesOptions {
    /** Override the lang attribute; defaults to pt-BR for Studio */
    lang?: string;
    /** Theme identifier used for deterministic `data-theme` */
    theme?: string;
    /** Class list (string or array) to normalize */
    className?: string | string[];
    /** Additional safe classes to preserve besides the defaults */
    allowList?: string[];
    /** Optional extra blocklist matchers */
    blocklist?: Array<string | RegExp>;
}

export interface NormalizedRootAttributes {
    lang: string;
    className: string;
    dataTheme: string;
    /** Convenience map for spreading into the <html> element */
    attributes: Record<string, string>;
}

const tokenize = (value?: string | string[]): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.flatMap((token) => token.split(' '));
    }
    return value.split(' ');
};

const isBlocked = (token: string, blocklist: RegExp[]): boolean => {
    if (!token) return false;
    return blocklist.some((pattern) => pattern.test(token));
};

const normalizeBlocklist = (patterns?: Array<string | RegExp>): RegExp[] => {
    if (!patterns?.length) return [];
    return patterns.map((pattern) => (pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i')));
};

const sortTokens = (tokens: Set<string>): string[] => {
    const ordered: string[] = [];
    BASE_CLASS_SEQUENCE.forEach((baseClass) => {
        if (tokens.has(baseClass)) {
            ordered.push(baseClass);
            tokens.delete(baseClass);
        }
    });
    const extras = Array.from(tokens).sort();
    return [...ordered, ...extras];
};

export function normalizeRootAttributes(
    options: NormalizeRootAttributesOptions = {},
): NormalizedRootAttributes {
    const lang = options.lang ?? DEFAULT_LANG;
    const dataTheme = options.theme ?? DEFAULT_THEME;
    const allowList = new Set([...DEFAULT_ALLOWED_CLASSNAMES, ...(options.allowList ?? [])]);
    const combinedBlocklist = [...DEFAULT_BLOCKLIST, ...normalizeBlocklist(options.blocklist)];

    const classTokens = new Set<string>();
    BASE_CLASS_SEQUENCE.forEach((token) => classTokens.add(token));

    tokenize(options.className).forEach((token) => {
        const trimmed = token.trim();
        if (!trimmed) return;
        if (isBlocked(trimmed, combinedBlocklist)) return;
        if (!allowList.has(trimmed)) return;
        classTokens.add(trimmed);
    });

    const className = sortTokens(classTokens).join(' ').trim();

    const attributes: Record<string, string> = {
        lang,
        'data-theme': dataTheme,
    };
    if (className) {
        attributes.className = className;
    }

    return {
        lang,
        className,
        dataTheme,
        attributes,
    };
}
