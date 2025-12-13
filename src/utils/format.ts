export const formatValueWithUnit = (value: string | number | null | undefined, unit: string = '') => {
    return value !== undefined && value !== null ? `${value} ${unit}` : 'N/A';
}

export const versionStringify = (...versions: (string | number | null | undefined)[]): string => {
    const validVersions: (string | number)[] = [];

    for (const version of versions) {
        if (version === null || version === undefined) {
            break;
        }
        validVersions.push(version);
    }

    return validVersions.join('.');
}

export const formatDollar = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) {
        return 'N/A';
    }
    if (typeof value === 'string') {
        return value
    }
    return `$${value}`;
}
