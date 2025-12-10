import type {SortOrder} from "antd/es/table/interface";

export const extractFirstNumber = (price: string | number | undefined): number => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const match = price.match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : NaN;
    }
    return NaN;
};

export const numberSorter = (
    a: number | string | undefined,
    b: number | string | undefined,
    sortOrder: SortOrder| undefined,
) => {
    let aValue: number
    let bValue: number

    if (typeof a === 'number') {
        aValue = a;
    } else if (typeof a === 'string') {
        aValue = extractFirstNumber(a);
    } else {
        aValue = NaN;
    }
    if (typeof b === 'number') {
        bValue = b;
    } else if (typeof b === 'string') {
        bValue = extractFirstNumber(b);
    } else {
        bValue = NaN;
    }

    const isANaN = Number.isNaN(aValue);
    const isBNaN = Number.isNaN(bValue);

    if (sortOrder === 'descend') {
        if (isANaN && !isBNaN) return -1;
        if (!isANaN && isBNaN) return 1;
    } else {
        if (isANaN && !isBNaN) return 1;
        if (!isANaN && isBNaN) return -1;
    }

    // 如果两者都不是数字，则保持原顺序（返回0）
    if (isANaN && isBNaN) return 0;

    // 如果两者都是数字，则正常比较
    return aValue - bValue;
}