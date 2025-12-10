import {Button, Input, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import { useState } from "react";
import {type GpuSpec} from "../data/gpu_specs.ts";
import type {SortOrder} from "antd/es/table/interface";

const extractFirstNumber = (price: string | number | undefined): number => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const match = price.match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : NaN;
    }
    return NaN;
};

const numberSorter = (
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

export function GpuSpecTable(props: { gpuSpecs: GpuSpec[] }) {
    const [pageSize, setPageSize] = useState(8);

    const columns: ColumnsType<GpuSpec> = [
        {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
            width: 120,
            filters: Array.from(new Set(props.gpuSpecs.map(item => item.manufacturer)))
                .filter(manufacturer => manufacturer !== undefined)
                .map(manufacturer => ({
                    text: manufacturer,
                    value: manufacturer,
                })),
            onFilter: (value, record) => record.manufacturer === value,
        },
        {
            title: '型号名称',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="搜索显卡型号"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters?.();
                            confirm();
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        重置
                    </Button>
                </div>
            ),
            onFilter: (value, record) =>
                record.name?.toLowerCase().includes((value as string).toLowerCase()) ?? false
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            render: (price) => {
                console.log(typeof price === "number", price === undefined, !isNaN(price), price)
                const priceStr: string =
                    price === undefined ? 'N/A' :
                        typeof price === 'number' ? "$" + price : price;
                return (<span>{priceStr}</span>)
            },
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend',
            sorter: (a, b, sortOrder) => {
                return numberSorter(a.price, b.price, sortOrder);
            },
            filterDropdown: (props) => {
                const currentValue = props.selectedKeys[0] ?? '';
                let [minValue, maxValue] = String(currentValue).split('-').map(val => val ?? '')
                if (minValue === undefined) minValue = ''
                if (maxValue === undefined) maxValue = ''

                return (
                    <div style={{ padding: 8 }}>
                        <Input
                            placeholder="最低价"
                            value={minValue}
                            type={"number"}
                            onChange={(e) => {
                                const newMin = e.target.value;
                                const newValue = newMin || maxValue ? `${newMin}-${maxValue}` : '';
                                props.setSelectedKeys(newValue ? [newValue] : []);
                            }}
                            onPressEnter={() => props.confirm()}
                            style={{ width: '100%', marginBottom: 8, display: 'block' }}
                        />
                        <Input
                            placeholder="最高价"
                            value={maxValue}
                            type={"number"}
                            onChange={(e) => {
                                const newMax = e.target.value;
                                const newValue = minValue || newMax ? `${minValue}-${newMax}` : '';
                                props.setSelectedKeys(newValue ? [newValue] : []);
                            }}
                            onPressEnter={() => props.confirm()}
                            style={{ width: '100%', marginBottom: 8, display: 'block' }}
                        />
                        <Button
                            onClick={() => props.confirm()}
                            style={{ marginRight: 8 }}
                        >
                            确定
                        </Button>
                        <Button onClick={() => {
                            props.setSelectedKeys([])
                            props.clearFilters?.()
                            props.confirm()
                        }}>
                            清空
                        </Button>
                    </div>
                );
            },
            onFilter: (value, record) => {
                if (!value) return true;

                const [min, max] = String(value).split('-');
                let price: number
                if (typeof record.price === "number") {
                    price = record.price;
                } else if (typeof record.price === "string") {
                    price = extractFirstNumber(record.price);
                } else {
                    return false
                }

                const minValid = min && min.trim() !== '';
                const maxValid = max && max.trim() !== '';

                if (minValid && maxValid) {
                    return price >= parseInt(min) && price <= parseInt(max);
                } else if (minValid) {
                    return price >= parseInt(min);
                } else if (maxValid) {
                    return price <= parseInt(max);
                }

                return true;
            },
        },
        {
            title: '发布时间',
            dataIndex: 'release_date',
            key: 'release_date',
            width: 150,
            render: (text) => text ? new Date(text).toLocaleDateString() : '',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="搜索年份"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        onClick={() => confirm()}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters?.();
                            confirm();
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        重置
                    </Button>
                </div>
            ),
            onFilter: (value, record) => {
                if (!record.release_date || !value) return false;
                return new Date(record.release_date).getFullYear().toString().includes(value.toString());
            }
        },
        {
            title: '显存容量 (GB)',
            dataIndex: 'memory_size_gb',
            key: 'memory_size_gb',
            width: 150,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => (a.memory_size_gb ?? 0) - (b.memory_size_gb ?? 0),
        },
        {
            title: '显存类型',
            dataIndex: 'memory_type',
            key: 'memory_type',
            width: 120,
        },
        {
            title: '基础频率 (MHz)',
            dataIndex: 'base_clock_mhz',
            key: 'base_clock_mhz',
            width: 150,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b, sortOrder) => numberSorter(a.base_clock_mhz, b.base_clock_mhz, sortOrder),
        },
        {
            title: '加速频率 (MHz)',
            dataIndex: 'boost_clock_mhz',
            key: 'boost_clock_mhz',
            width: 150,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b, sortOrder) => numberSorter(a.boost_clock_mhz, b.boost_clock_mhz, sortOrder),
        },
        {
            title: '工艺 (nm)',
            dataIndex: 'process_size_nm',
            key: 'process_size_nm',
            width: 120,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b, sortOrder) => numberSorter(a.process_size_nm, b.process_size_nm, sortOrder),
        },
        {
            title: '晶体管数量 (百万)',
            dataIndex: 'transistor_count_m',
            key: 'transistor_count_m',
            width: 180,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b, sortOrder) => numberSorter(a.transistor_count_m, b.transistor_count_m, sortOrder),
        },
        {
            title: '核心面积 (mm²)',
            dataIndex: 'die_size_mm2',
            key: 'die_size_mm2',
            width: 150,
        },
    ];

    return (
        <>
            <Table
                dataSource={props.gpuSpecs}
                columns={columns}
                scroll={{ x: 'max-content' }}
                pagination={{
                    showTotal: (total) => {
                        return `共 ${total} 条`;
                    },
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSize: pageSize,
                    pageSizeOptions: [8, 16, 32],
                    onShowSizeChange: (_, size) => {
                        setPageSize(size);
                    },
                }}
            />
        </>
    )
}
