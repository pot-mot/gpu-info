// Helper function to format values with units
export const formatValueWithUnit = (value: string | number | undefined, unit: string = '') => {
    return value !== undefined && value !== null ? `${value} ${unit}` : 'N/A';
}