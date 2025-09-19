// utils/transliterate.ts
export const transliteratePL = (input: string): string => {
    if (!input) return input;
    let s = input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    const explicitMap: Record<string, string> = { 'ł': 'l', 'Ł': 'L' };
    s = s.replace(/[Łł]/g, ch => explicitMap[ch] ?? ch);
    const plMap: Record<string, string> = {
        'ą': 'a', 'Ą': 'A', 'ć': 'c', 'Ć': 'C', 'ę': 'e', 'Ę': 'E',
        'ń': 'n', 'Ń': 'N', 'ó': 'o', 'Ó': 'O', 'ś': 's', 'Ś': 'S',
        'ż': 'z', 'Ż': 'Z', 'ź': 'z', 'Ź': 'Z',
    };
    s = s.replace(/[ąćęńóśżźĄĆĘŃÓŚŻŹ]/g, ch => plMap[ch] ?? ch);
    return s;
};

export const slugifyAscii = (input: string): string =>
    transliteratePL(input)
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
    Object.prototype.toString.call(v) === '[object Object]';

export const deepTransliterate = <T>(value: T): T => {
    if (typeof value === 'string') return transliteratePL(value) as unknown as T;
    if (value instanceof Date) return value;                 
    if (value instanceof Map || value instanceof Set) return value;
    if (value instanceof RegExp) return value;
    if (Array.isArray(value)) return value.map(deepTransliterate) as unknown as T;
    if (value && isPlainObject(value)) {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(value)) out[k] = deepTransliterate(v);
        return out as T;
    }
    return value;
};

export const ensureDate = (val: unknown): Date | null => {
    if (val instanceof Date && !Number.isNaN(val.valueOf())) return val;
    if (typeof val === 'string' || typeof val === 'number') {
        const d = new Date(val);
        return Number.isNaN(d.valueOf()) ? null : d;
    }
    return null;
};
