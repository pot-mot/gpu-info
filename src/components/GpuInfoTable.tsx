import {Button, Input, Table} from "antd";
import {type GpuInfo} from "../data/gpuInfo.ts";
import type {ColumnsType} from "antd/es/table";
import { useState } from "react";

const extractInteger = (value: string): number | undefined => {
    if (!value) return undefined;

    try {
        const match = value.match(/(\d+(?:\.\d+)?)(万)?/);
        if (!match) return undefined;

        const unit = match?.[2];
        if (unit === '万') {
            return parseFloat(match[1]) * 10000;
        }

        return parseFloat(match[1]);
    } catch (e) {
        console.error(e)
        return undefined
    }
}

// 辅助函数：提取内存大小中的数字并处理单位
const extractMemorySize = (value: string): number | undefined => {
    if (!value) return undefined;

    const match = value.match(/(\d+)(GB|MB)/i);
    if (!match) return undefined;

    const size = parseInt(match[1]);
    const unit = match[2].toUpperCase();

    // 统一转换为MB单位进行比较
    return unit === 'GB' ? size * 1024 : size;
}

const columns: ColumnsType<GpuInfo> = [
    {
        title: '型号',
        dataIndex: 'name',
        key: 'name',
        width: 216,
        onFilter: (value, record) => {
            if (!value) return true;
            return record.name.toLowerCase().includes(String(value).toLowerCase());
        },
        filterDropdown: (props) => {
            return (
                <>
                    <Input
                        placeholder="输入显卡型号"
                        value={props.selectedKeys[0]}
                        onChange={e => props.setSelectedKeys([e.target.value])}
                        onPressEnter={() => props.confirm()}
                        style={{ width: '100%', marginBottom: 8, display: 'block' }}
                    />
                    <Button onClick={() => props.confirm()} style={{ marginRight: 8 }}>确定</Button>
                    <Button onClick={() => props.clearFilters?.()}>清空</Button>
                </>
            )
        }
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => {
            return (extractInteger(a.price) ?? 0) - (extractInteger(b.price) ?? 0)
        },
        sortDirections: ['descend', 'ascend'],
        width: 144,
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
            const priceValue = extractInteger(record.price);
            if (priceValue === undefined) return false;

            const minValid = min && min.trim() !== '';
            const maxValid = max && max.trim() !== '';

            if (minValid && maxValid) {
                return priceValue >= parseInt(min) && priceValue <= parseInt(max);
            } else if (minValid) {
                return priceValue >= parseInt(min);
            } else if (maxValid) {
                return priceValue <= parseInt(max);
            }

            return true;
        },
    },
    {
        title: '跑分',
        dataIndex: 'score',
        key: 'score',
        sorter: (a, b) => {
            return (extractInteger(a.score) ?? 0) - (extractInteger(b.score) ?? 0)
        },
        sortDirections: ['descend', 'ascend'],
        width: 144,
    },
    {
        title: '流处理器',
        dataIndex: 'stream_pro',
        key: 'stream_pro',
        width: 96,
    },
    {
        title: '核心频率',
        dataIndex: 'core_clock',
        key: 'core_clock',
        width: 324,
    },
    {
        title: '显存类型',
        dataIndex: 'memory_rate',
        key: 'memory_rate',
        width: 96,
    },
    {
        title: '显存容量',
        dataIndex: 'memory_size',
        key: 'memory_size',
        sorter: (a, b) => {
            return (extractMemorySize(a.memory_size) ?? 0) - (extractMemorySize(b.memory_size) ?? 0)
        },
        sortDirections: ['descend', 'ascend'],
        width: 144,
    },
    {
        title: '发布日期',
        dataIndex: 'pub_date',
        key: 'pub_date',
        width: 144,
    },
];

function GpuInfoTable(props: { gpuInfos: GpuInfo[] }) {
    const [pageSize, setPageSize] = useState(8);

    return (
        <>
            <Table
                dataSource={props.gpuInfos}
                columns={columns}
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

export default GpuInfoTable
