import {SortChart} from "../components/SortChart.tsx";
import {defaultGpuSpecs, type GpuSpec} from "../data/gpu_specs.ts";
import {useMemo, useState} from "react";
import {Button, Input, Select} from "antd";
import {useNavigate} from "react-router";

export function GpuSortPage() {
    const navigate = useNavigate();

    const [gpuSpecs] = useState(defaultGpuSpecs)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [sortProp, setSortProp] = useState<keyof GpuSpec>("boost_clock_mhz");
    const [sortLimit, setSortLimit] = useState(50);

    const allManufacturer = Array.from(new Set(
        gpuSpecs
            .map(item => item.manufacturer)
            .filter(it => it !== undefined)
    )).sort((a, b) => a.localeCompare(b))
    const allMemoryType = Array.from(new Set(
        gpuSpecs
            .map(item => item.memory_type)
            .filter(it => it !== undefined)
    )).sort((a, b) => a.localeCompare(b))

    const [manufacturerFilter, setManufacturerFilter] = useState<string | undefined>(undefined);
    const [memoryTypeFilter, setMemoryTypeFilter] = useState<string | undefined>(undefined);
    const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
    const filteredGpuSpecs = useMemo(() => {
        return gpuSpecs.filter(item => {
            // 按制造商过滤
            if (manufacturerFilter !== undefined && item.manufacturer !== manufacturerFilter) {
                return false;
            }
            // 按内存类型过滤
            if (memoryTypeFilter !== undefined && item.memory_type !== memoryTypeFilter) {
                return false;
            }
            // 按名称过滤（不区分大小写的模糊匹配）
            return !(nameFilter !== undefined && item.name !== undefined && !item.name.toLowerCase().includes(nameFilter.toLowerCase()));
        })
    }, [gpuSpecs, manufacturerFilter, memoryTypeFilter, nameFilter])

    const toTable = () => {
        navigate('/gpu/table')
    }

    const toDetail = (id: string) => {
        navigate(`/gpu/${id}`)
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{ display: 'flex', gap: "0.5rem" }}>
                    <Select
                        value={sortProp}
                        onChange={(value) => setSortProp(value)}
                        options={[
                            {value: "base_clock_mhz", label: "基本频率"},
                            {value: "boost_clock_mhz", label: "加速频率"},
                            {value: "memory_clock_mhz", label: "显存频率"},
                            {value: "memory_size_gb", label: "显存容量"},
                            {value: "memory_bandwidth_gb_s", label: "显存带宽"},
                            {value: "shading_units", label: "着色单元"},
                            {value: "texture_mapping_units", label: "纹理映射单元"},
                            {value: "render_output_processors", label: "渲染输出处理器"},
                            {value: "streaming_multiprocessors", label: "流式多处理器"},
                            {value: "tensor_cores", label: "张量核心"},
                            {value: "ray_tracing_cores", label: "光线追踪核心"},
                            {value: "l1_cache_kb", label: "一级缓存(KB)"},
                            {value: "l2_cache_mb", label: "二级缓存(MB)"},
                            {value: "thermal_design_power_w", label: "热设计功耗(W)"},
                            {value: "transistor_count_m", label: "晶体管数量"},
                            {value: "die_size_mm2", label: "芯片面积(mm2)"},
                            {value: "price", label: "价格"},
                        ]}
                        style={{width: "8rem"}}
                    />
                    <Select
                        value={sortDirection}
                        onChange={(value) => setSortDirection(value)}
                        options={[
                            {value: "desc", label: "降序"},
                            {value: "asc", label: "升序"},
                        ]}
                    />
                    <Select
                        value={sortLimit}
                        onChange={(value) => setSortLimit(value)}
                        options={[
                            {value: 10, label: "10"},
                            {value: 20, label: "20"},
                            {value: 50, label: "50"},
                            {value: 100, label: "100"},
                            {value: 200, label: "200"},
                            {value: filteredGpuSpecs.length, label: "全部"}
                        ].filter(item => item.value <= filteredGpuSpecs.length)}
                        style={{width: "5rem"}}
                    />

                    <Select
                        allowClear
                        placeholder="制造商"
                        value={manufacturerFilter}
                        onChange={(value) => setManufacturerFilter(value)}
                        options={allManufacturer.map(m => ({value: m, label: m}))}
                        style={{width: "8rem"}}
                    />
                    <Select
                        allowClear
                        placeholder="内存类型"
                        value={memoryTypeFilter}
                        onChange={(value) => setMemoryTypeFilter(value)}
                        options={allMemoryType.map(m => ({value: m, label: m}))}
                        style={{width: "8rem"}}
                    />
                    <Input
                        placeholder="名称搜索"
                        value={nameFilter || ""}
                        onChange={(e) => setNameFilter(e.target.value || undefined)}
                        style={{width: "8rem"}}
                    />
                </div>

                <Button onClick={toTable}>查看表格</Button>
            </div>

            <SortChart
                data={filteredGpuSpecs}
                prop={sortProp}
                direction={sortDirection}
                limit={sortLimit}
                value={(item) => (
                    <div>{item[sortProp]}</div>
                )}
                label={(item) => (
                    <div
                        onClick={() => toDetail(item.id)}
                        style={{cursor: "pointer"}}
                    >
                        {item.name}
                    </div>
                )}
            />
        </>
    )
}
