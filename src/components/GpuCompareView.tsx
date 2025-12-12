import type {GpuSpec} from "../data/gpu_specs.ts";
import {Divider} from 'antd';
import {formatValueWithUnit} from "../utils/format.ts";

const GOOD_COLOR = "#80ca28"
const BAD_COLOR = "#f81717"

export function GpuCompareView(props: {
    left: GpuSpec | undefined,
    right: GpuSpec | undefined,
    showDiffOnly: boolean
}) {
    const renderComparisonItem = (
        label: string,
        leftValue: string | number | undefined,
        rightValue: string | number | undefined,
        unit: string | undefined = undefined,
        isGood: (leftValue: number, rightValue: number) => boolean = (leftValue, rightValue) => {
            return leftValue >= rightValue
        }
    ) => {
        if (props.showDiffOnly && leftValue === rightValue) return null

        // 在这里进行格式化
        const formattedLeftValue = typeof leftValue === 'number' || typeof leftValue === 'string'
            ? formatValueWithUnit(leftValue, unit)
            : leftValue ?? 'N/A';

        const formattedRightValue = typeof rightValue === 'number' || typeof rightValue === 'string'
            ? formatValueWithUnit(rightValue, unit)
            : rightValue ?? 'N/A';


        if (typeof leftValue === "number" && typeof rightValue === "number") {
            const bigger = Math.max(leftValue, rightValue)
            const isLeftGood = isGood(leftValue, rightValue)
            const isRightGood = isGood(rightValue, leftValue)

            return (
                <>
                    <div style={{
                        lineHeight: '2rem',
                        fontSize: '1rem',
                        textAlign: 'center'
                    }}>
                        {label}
                    </div>
                    <div style={{lineHeight: '1.5rem', fontSize: '1rem', display: 'grid', gridTemplateColumns: ' 10rem 1fr 1fr 10rem'}}>
                        <div style={{textAlign: 'left'}}>
                            {formattedLeftValue}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-end', height: '100%', alignItems: 'center'}}>
                            <div
                                style={{
                                    width: (leftValue * 100 / bigger) + "%",
                                    height: '10px',
                                    backgroundColor: isLeftGood ? GOOD_COLOR : BAD_COLOR,
                                    borderRadius: '5px 0 0 5px'
                                }}
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'flex-start', height: '100%', alignItems: 'center'}}>
                            <div
                                style={{
                                    width: (rightValue * 100 / bigger) + "%",
                                    height: '10px',
                                    backgroundColor: isRightGood ? GOOD_COLOR : BAD_COLOR,
                                    borderRadius: '0 5px 5px 0'
                                }}
                            />
                        </div>
                        <div style={{textAlign: 'right'}}>
                            {formattedRightValue}
                        </div>
                    </div>
                </>
            )
        }

        return (
            <>
                <div style={{
                    lineHeight: '2rem',
                    fontSize: '1rem',
                    textAlign: 'center'
                }}>
                    {label}
                </div>
                <div style={{
                    lineHeight: '1.5rem',
                    fontSize: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div style={{textAlign: 'left'}}>
                        {formattedLeftValue}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        {formattedRightValue}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            <Divider orientation="horizontal">基础信息</Divider>

            {renderComparisonItem(
                "制造商",
                props.left?.manufacturer ?? 'N/A',
                props.right?.manufacturer ?? 'N/A'
            )}

            {renderComparisonItem(
                "GPU芯片",
                props.left?.gpu_name ?? 'N/A',
                props.right?.gpu_name ?? 'N/A'
            )}

            {renderComparisonItem(
                "世代",
                props.left?.generation ?? 'N/A',
                props.right?.generation ?? 'N/A'
            )}

            {renderComparisonItem(
                "架构",
                props.left?.architecture ?? 'N/A',
                props.right?.architecture ?? 'N/A'
            )}

            {renderComparisonItem(
                "晶圆厂",
                props.left?.foundry ?? 'N/A',
                props.right?.foundry ?? 'N/A'
            )}

            {renderComparisonItem(
                "工艺制程",
                props.left?.process_size_nm ?? 'N/A',
                props.right?.process_size_nm ?? 'N/A',
                'nm',
                (leftValue, rightValue) => {
                    return leftValue <= rightValue
                }
            )}

            {renderComparisonItem(
                "晶体管数量",
                props.left?.transistor_count_m,
                props.right?.transistor_count_m,
                'M'
            )}

            {renderComparisonItem(
                "晶体管密度",
                props.left?.transistor_density_k_mm2,
                props.right?.transistor_density_k_mm2,
                'K/mm²'
            )}

            {renderComparisonItem(
                "芯片面积",
                props.left?.die_size_mm2,
                props.right?.die_size_mm2,
                'mm²'
            )}

            {renderComparisonItem(
                "封装类型",
                props.left?.chip_package ?? 'N/A',
                props.right?.chip_package ?? 'N/A'
            )}

            {renderComparisonItem(
                "发布日期",
                props.left?.release_date ? new Date(props.left?.release_date).toLocaleDateString() : 'N/A',
                props.right?.release_date ? new Date(props.right?.release_date).toLocaleDateString() : 'N/A',
                undefined,
            )}

            {renderComparisonItem(
                "总线接口",
                props.left?.bus_interface ?? 'N/A',
                props.right?.bus_interface ?? 'N/A'
            )}

            <Divider orientation="horizontal">核心频率</Divider>

            {renderComparisonItem(
                "基础频率",
                props.left?.base_clock_mhz,
                props.right?.base_clock_mhz,
                'MHz'
            )}

            {renderComparisonItem(
                "加速频率",
                props.left?.boost_clock_mhz,
                props.right?.boost_clock_mhz,
                'MHz'
            )}

            <Divider orientation="horizontal">显存规格</Divider>

            {renderComparisonItem(
                "显存频率",
                props.left?.memory_clock_mhz,
                props.right?.memory_clock_mhz,
                'MHz'
            )}

            {renderComparisonItem(
                "显存容量",
                props.left?.memory_size_gb,
                props.right?.memory_size_gb,
                'GB'
            )}

            {renderComparisonItem(
                "显存位宽",
                props.left?.memory_bus_bits,
                props.right?.memory_bus_bits,
                'bit'
            )}

            {renderComparisonItem(
                "显存带宽",
                props.left?.memory_bandwidth_gb_s,
                props.right?.memory_bandwidth_gb_s,
                'GB/s'
            )}

            {renderComparisonItem(
                "显存类型",
                props.left?.memory_type ?? 'N/A',
                props.right?.memory_type ?? 'N/A'
            )}

            <Divider orientation="horizontal">计算单元</Divider>

            {renderComparisonItem(
                "着色单元",
                props.left?.shading_units,
                props.right?.shading_units
            )}

            {renderComparisonItem(
                "纹理映射单元",
                props.left?.texture_mapping_units,
                props.right?.texture_mapping_units
            )}

            {renderComparisonItem(
                "渲染输出处理器",
                props.left?.render_output_processors,
                props.right?.render_output_processors
            )}

            {renderComparisonItem(
                "流式多处理器",
                props.left?.streaming_multiprocessors,
                props.right?.streaming_multiprocessors
            )}

            {renderComparisonItem(
                "张量核心",
                props.left?.tensor_cores,
                props.right?.tensor_cores
            )}

            {renderComparisonItem(
                "光线追踪核心",
                props.left?.ray_tracing_cores,
                props.right?.ray_tracing_cores
            )}

            <Divider orientation="horizontal">缓存</Divider>

            {renderComparisonItem(
                "一级缓存",
                props.left?.l1_cache_kb,
                props.right?.l1_cache_kb,
                'KB'
            )}

            {renderComparisonItem(
                "二级缓存",
                props.left?.l2_cache_mb,
                props.right?.l2_cache_mb,
                'MB'
            )}

            <Divider orientation="horizontal">物理规格</Divider>

            {renderComparisonItem(
                "热设计功耗",
                props.left?.thermal_design_power_w,
                props.right?.thermal_design_power_w,
                'W',
                (leftValue, rightValue) => {
                    return leftValue <= rightValue
                }
            )}

            {renderComparisonItem(
                "板卡长度",
                props.left?.board_length_mm,
                props.right?.board_length_mm,
                'mm'
            )}

            {renderComparisonItem(
                "板卡宽度",
                props.left?.board_width_mm,
                props.right?.board_width_mm,
                'mm'
            )}

            {renderComparisonItem(
                "板卡插槽宽度",
                props.left?.board_slot_width ?? 'N/A',
                props.right?.board_slot_width ?? 'N/A'
            )}

            {renderComparisonItem(
                "建议电源功率",
                props.left?.suggested_psu_w,
                props.right?.suggested_psu_w,
                'W',
                (leftValue, rightValue) => {
                    return leftValue <= rightValue
                }
            )}

            {renderComparisonItem(
                "电源接口",
                props.left?.power_connectors ?? 'N/A',
                props.right?.power_connectors ?? 'N/A'
            )}

            {renderComparisonItem(
                "显示接口",
                props.left?.display_connectors ?? 'N/A',
                props.right?.display_connectors ?? 'N/A'
            )}

            <Divider orientation="horizontal">API支持</Divider>

            {renderComparisonItem(
                "DirectX版本",
                props.left?.directx_major_version !== undefined && props.left?.directx_minor_version !== undefined
                    ? `${props.left?.directx_major_version}.${props.left?.directx_minor_version}`
                    : 'N/A',
                props.right?.directx_major_version !== undefined && props.right?.directx_minor_version !== undefined
                    ? `${props.right?.directx_major_version}.${props.right?.directx_minor_version}`
                    : 'N/A'
            )}

            {renderComparisonItem(
                "OpenGL版本",
                props.left?.opengl_major_version !== undefined && props.left?.opengl_minor_version !== undefined
                    ? `${props.left?.opengl_major_version}.${props.left?.opengl_minor_version}`
                    : 'N/A',
                props.right?.opengl_major_version !== undefined && props.right?.opengl_minor_version !== undefined
                    ? `${props.right?.opengl_major_version}.${props.right?.opengl_minor_version}`
                    : 'N/A'
            )}

            {renderComparisonItem(
                "Vulkan版本",
                props.left?.vulkan_major_version !== undefined && props.left?.vulkan_minor_version !== undefined
                    ? `${props.left?.vulkan_major_version}.${props.left?.vulkan_minor_version}`
                    : 'N/A',
                props.right?.vulkan_major_version !== undefined && props.right?.vulkan_minor_version !== undefined
                    ? `${props.right?.vulkan_major_version}.${props.right?.vulkan_minor_version}`
                    : 'N/A'
            )}

            {renderComparisonItem(
                "OpenCL版本",
                props.left?.opencl_major_version !== undefined && props.left?.opencl_minor_version !== undefined
                    ? `${props.left?.opencl_major_version}.${props.left?.opencl_minor_version}`
                    : 'N/A',
                props.right?.opencl_major_version !== undefined && props.right?.opencl_minor_version !== undefined
                    ? `${props.right?.opencl_major_version}.${props.right?.opencl_minor_version}`
                    : 'N/A'
            )}

            {renderComparisonItem(
                "CUDA版本",
                props.left?.cuda_major_version !== undefined && props.left?.cuda_minor_version !== undefined
                    ? `${props.left?.cuda_major_version}.${props.left?.cuda_minor_version}`
                    : 'N/A',
                props.right?.cuda_major_version !== undefined && props.right?.cuda_minor_version !== undefined
                    ? `${props.right?.cuda_major_version}.${props.right?.cuda_minor_version}`
                    : 'N/A'
            )}

            <Divider orientation="horizontal">性能指标</Divider>

            {renderComparisonItem(
                "像素率",
                props.left?.pixel_rate_gpixel_s,
                props.right?.pixel_rate_gpixel_s,
                'GPixel/s'
            )}

            {renderComparisonItem(
                "纹理率",
                props.left?.texture_rate_gtexel_s,
                props.right?.texture_rate_gtexel_s,
                'GTexel/s'
            )}

            {renderComparisonItem(
                "半精度性能",
                props.left?.half_float_performance_gflop_s,
                props.right?.half_float_performance_gflop_s,
                'GFLOPS'
            )}

            {renderComparisonItem(
                "单精度性能",
                props.left?.single_float_performance_gflop_s,
                props.right?.single_float_performance_gflop_s,
                'GFLOPS'
            )}

            {renderComparisonItem(
                "双精度性能",
                props.left?.double_float_performance_gflop_s,
                props.right?.double_float_performance_gflop_s,
                'GFLOPS'
            )}

            {renderComparisonItem(
                "价格",
                props.left?.price === undefined ? 'N/A' :
                    typeof props.left?.price === 'number' ? "$" + props.left?.price : props.left?.price,
                props.right?.price === undefined ? 'N/A' :
                    typeof props.right?.price === 'number' ? "$" + props.right?.price : props.right?.price
            )}
        </div>
    );
}
