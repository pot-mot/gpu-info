import {Button, Input} from "antd";
import type {FilterDropdownProps} from "antd/es/table/interface";
import React from "react";

interface RangeFilterProps extends FilterDropdownProps {
    minPlaceholder?: string;
    maxPlaceholder?: string;
}

export const RangeFilter: React.FC<RangeFilterProps> = (
    {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        minPlaceholder = "最小值",
        maxPlaceholder = "最大值"
    }
) => {
    const currentValue = selectedKeys[0] ?? '';
    let [minValue, maxValue] = String(currentValue).split('-').map(val => val ?? '');

    if (minValue === undefined) minValue = '';
    if (maxValue === undefined) maxValue = '';

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = e.target.value;
        const newValue = newMin || maxValue ? `${newMin}-${maxValue}` : '';
        setSelectedKeys(newValue ? [newValue] : []);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = e.target.value;
        const newValue = minValue || newMax ? `${minValue}-${newMax}` : '';
        setSelectedKeys(newValue ? [newValue] : []);
    };

    return (
        <div style={{padding: 8}}>
            <Input
                placeholder={minPlaceholder}
                value={minValue}
                type="number"
                onChange={handleMinChange}
                onPressEnter={() => confirm()}
                style={{width: '100%', marginBottom: 8, display: 'block'}}
            />
            <Input
                placeholder={maxPlaceholder}
                value={maxValue}
                type="number"
                onChange={handleMaxChange}
                onPressEnter={() => confirm()}
                style={{width: '100%', marginBottom: 8, display: 'block'}}
            />
            <Button
                onClick={() => confirm()}
                style={{marginRight: 8}}
            >
                确定
            </Button>
            <Button
                onClick={() => {
                    setSelectedKeys([]);
                    clearFilters?.();
                    confirm();
                }}
            >
                清空
            </Button>
        </div>
    );
};
