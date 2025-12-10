import {Button, Input, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import { useState } from "react";
import {type GpuSpec} from "../data/gpu_specs.ts";
import {extractFirstNumber, numberSorter} from "../utils/number.ts";
import { RangeFilter } from "./RangeFilter.tsx";

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
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            fixed: 'start',
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
            title: '发布时间',
            dataIndex: 'release_date',
            key: 'release_date',
            width: 150,
            render: (text) => text ? new Date(text).toLocaleDateString() : '',
            sortDirections: ['descend', 'ascend'],
            sorter: {
                compare: (a, b, sortOrder) => {
                    const dateA = a.release_date ? new Date(a.release_date).getTime() : NaN;
                    const dateB = b.release_date ? new Date(b.release_date).getTime() : NaN;
                    return numberSorter(dateA, dateB, sortOrder)
                },
                multiple: 3
            },
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
            sorter: {
                compare: (a, b, sortOrder) => numberSorter(a.price, b.price, sortOrder),
                multiple: 2
            },
            filterDropdown: (props) => (
                <RangeFilter
                    {...props}
                    minPlaceholder="最低价"
                    maxPlaceholder="最高价"
                />
            ),
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
            title: '显存容量 (GB)',
            dataIndex: 'memory_size_gb',
            key: 'memory_size_gb',
            width: 150,
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend',
            sorter: {
                compare: (a, b, sortOrder) => numberSorter(a.memory_size_gb, b.memory_size_gb, sortOrder),
                multiple: 1
            },
            filterDropdown: (props) => (
                <RangeFilter
                    {...props}
                    minPlaceholder="最低显存"
                    maxPlaceholder="最高显存"
                />
            ),
            onFilter: (value, record) => {
                if (!value) return true;

                const [min, max] = String(value).split('-');
                let memory_size_gb: number
                if (typeof record.memory_size_gb === "number") {
                    memory_size_gb = record.memory_size_gb;
                } else {
                    return false
                }

                const minValid = min && min.trim() !== '';
                const maxValid = max && max.trim() !== '';

                if (minValid && maxValid) {
                    return memory_size_gb >= parseInt(min) && memory_size_gb <= parseInt(max);
                } else if (minValid) {
                    return memory_size_gb >= parseInt(min);
                } else if (maxValid) {
                    return memory_size_gb <= parseInt(max);
                }

                return true;
            },
        },
        {
            title: '显存类型',
            dataIndex: 'memory_type',
            key: 'memory_type',
            width: 150,
            filters: Array.from(new Set(props.gpuSpecs.map(item => item.memory_type)))
                .filter(memory_type => memory_type !== undefined)
                .map(memory_type => ({
                    text: memory_type,
                    value: memory_type,
                })),
            onFilter: (value, record) => record.memory_type === value,
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
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b, sortOrder) => numberSorter(a.die_size_mm2, b.die_size_mm2, sortOrder),
        },
    ];

    return (
        <>
            <Table
                dataSource={props.gpuSpecs}
                columns={columns}
                scroll={{ x: 'max-content' }}
                tableLayout={'fixed'}
                sticky={true}
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
