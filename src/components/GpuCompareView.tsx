import type {GpuSpec} from "../data/gpu_specs.ts";
import {Divider} from 'antd';
import {CompareItem, NumberCompareItem, StringCompareItem} from "./CompareItem.tsx";
import {formatDollar, versionStringify} from "../utils/format.ts";
import {extractFirstNumber} from "../utils/number.ts";

export function GpuCompareView(props: {
    left: GpuSpec | undefined,
    right: GpuSpec | undefined,
    showDiffOnly: boolean
}) {
    return (
        <div>
            <Divider orientation="horizontal">基础信息</Divider>

            <StringCompareItem
                label="制造商"
                leftValue={props.left?.manufacturer}
                rightValue={props.right?.manufacturer}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="GPU芯片"
                leftValue={props.left?.gpu_name}
                rightValue={props.right?.gpu_name}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="世代"
                leftValue={props.left?.generation}
                rightValue={props.right?.generation}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="架构"
                leftValue={props.left?.architecture}
                rightValue={props.right?.architecture}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="晶圆厂"
                leftValue={props.left?.foundry}
                rightValue={props.right?.foundry}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="工艺制程"
                leftValue={props.left?.process_size_nm}
                rightValue={props.right?.process_size_nm}
                unit="nm"
                numberCompare={(left, right) => left < right}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="晶体管数量"
                leftValue={props.left?.transistor_count_m}
                rightValue={props.right?.transistor_count_m}
                unit="M"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="晶体管密度"
                leftValue={props.left?.transistor_density_k_mm2}
                rightValue={props.right?.transistor_density_k_mm2}
                unit="K/mm²"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="芯片面积"
                leftValue={props.left?.die_size_mm2}
                rightValue={props.right?.die_size_mm2}
                unit="mm²"
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="封装类型"
                leftValue={props.left?.chip_package}
                rightValue={props.right?.chip_package}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="发布日期"
                leftValue={props.left?.release_date ? new Date(props.left?.release_date).toLocaleDateString() : undefined}
                rightValue={props.right?.release_date ? new Date(props.right?.release_date).toLocaleDateString() : undefined}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="总线接口"
                leftValue={props.left?.bus_interface}
                rightValue={props.right?.bus_interface}
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">核心频率</Divider>

            <NumberCompareItem
                label="基础频率"
                leftValue={props.left?.base_clock_mhz}
                rightValue={props.right?.base_clock_mhz}
                unit="MHz"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="加速频率"
                leftValue={props.left?.boost_clock_mhz}
                rightValue={props.right?.boost_clock_mhz}
                unit="MHz"
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">显存规格</Divider>

            <NumberCompareItem
                label="显存频率"
                leftValue={props.left?.memory_clock_mhz}
                rightValue={props.right?.memory_clock_mhz}
                unit="MHz"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="显存容量"
                leftValue={props.left?.memory_size_gb}
                rightValue={props.right?.memory_size_gb}
                unit="GB"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="显存位宽"
                leftValue={props.left?.memory_bus_bits}
                rightValue={props.right?.memory_bus_bits}
                unit="bit"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="显存带宽"
                leftValue={props.left?.memory_bandwidth_gb_s}
                rightValue={props.right?.memory_bandwidth_gb_s}
                unit="GB/s"
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="显存类型"
                leftValue={props.left?.memory_type}
                rightValue={props.right?.memory_type}
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">计算单元</Divider>

            <NumberCompareItem
                label="着色单元"
                leftValue={props.left?.shading_units}
                rightValue={props.right?.shading_units}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="纹理映射单元"
                leftValue={props.left?.texture_mapping_units}
                rightValue={props.right?.texture_mapping_units}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="渲染输出处理器"
                leftValue={props.left?.render_output_processors}
                rightValue={props.right?.render_output_processors}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="流式多处理器"
                leftValue={props.left?.streaming_multiprocessors}
                rightValue={props.right?.streaming_multiprocessors}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="张量核心"
                leftValue={props.left?.tensor_cores}
                rightValue={props.right?.tensor_cores}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="光线追踪核心"
                leftValue={props.left?.ray_tracing_cores}
                rightValue={props.right?.ray_tracing_cores}
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">缓存</Divider>

            <NumberCompareItem
                label="一级缓存"
                leftValue={props.left?.l1_cache_kb}
                rightValue={props.right?.l1_cache_kb}
                unit="KB"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="二级缓存"
                leftValue={props.left?.l2_cache_mb}
                rightValue={props.right?.l2_cache_mb}
                unit="MB"
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">物理规格</Divider>

            <NumberCompareItem
                label="热设计功耗"
                leftValue={props.left?.thermal_design_power_w}
                rightValue={props.right?.thermal_design_power_w}
                unit="W"
                numberCompare={(left, right) => left < right}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="板卡长度"
                leftValue={props.left?.board_length_mm}
                rightValue={props.right?.board_length_mm}
                unit="mm"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="板卡宽度"
                leftValue={props.left?.board_width_mm}
                rightValue={props.right?.board_width_mm}
                unit="mm"
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="板卡插槽宽度"
                leftValue={props.left?.board_slot_width}
                rightValue={props.right?.board_slot_width}
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="建议电源功率"
                leftValue={props.left?.suggested_psu_w}
                rightValue={props.right?.suggested_psu_w}
                unit="W"
                numberCompare={(left, right) => left < right}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="电源接口"
                leftValue={props.left?.power_connectors}
                rightValue={props.right?.power_connectors}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="显示接口"
                leftValue={props.left?.display_connectors}
                rightValue={props.right?.display_connectors}
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">API支持</Divider>

            <StringCompareItem
                label="DirectX版本"
                leftValue={versionStringify(props.left?.directx_major_version, props.left?.directx_minor_version)}
                rightValue={versionStringify(props.right?.directx_major_version, props.right?.directx_minor_version)}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="OpenGL版本"
                leftValue={versionStringify(props.left?.opengl_major_version, props.left?.opengl_minor_version)}
                rightValue={versionStringify(props.right?.opengl_major_version, props.right?.opengl_minor_version)}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="Vulkan版本"
                leftValue={versionStringify(props.left?.vulkan_major_version, props.left?.vulkan_minor_version)}
                rightValue={versionStringify(props.right?.vulkan_major_version, props.right?.vulkan_minor_version)}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="OpenCL版本"
                leftValue={versionStringify(props.left?.opencl_major_version, props.left?.opencl_minor_version)}
                rightValue={versionStringify(props.right?.opencl_major_version, props.right?.opencl_minor_version)}
                showDiffOnly={props.showDiffOnly}
            />

            <StringCompareItem
                label="CUDA版本"
                leftValue={versionStringify(props.left?.cuda_major_version, props.left?.cuda_minor_version)}
                rightValue={versionStringify(props.right?.cuda_major_version, props.right?.cuda_minor_version)}
                showDiffOnly={props.showDiffOnly}
            />

            <Divider orientation="horizontal">性能指标</Divider>

            <NumberCompareItem
                label="像素率"
                leftValue={props.left?.pixel_rate_gpixel_s}
                rightValue={props.right?.pixel_rate_gpixel_s}
                unit="GPixel/s"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="纹理率"
                leftValue={props.left?.texture_rate_gtexel_s}
                rightValue={props.right?.texture_rate_gtexel_s}
                unit="GTexel/s"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="半精度性能"
                leftValue={props.left?.half_float_performance_gflop_s}
                rightValue={props.right?.half_float_performance_gflop_s}
                unit="GFLOPS"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="单精度性能"
                leftValue={props.left?.single_float_performance_gflop_s}
                rightValue={props.right?.single_float_performance_gflop_s}
                unit="GFLOPS"
                showDiffOnly={props.showDiffOnly}
            />

            <NumberCompareItem
                label="双精度性能"
                leftValue={props.left?.double_float_performance_gflop_s}
                rightValue={props.right?.double_float_performance_gflop_s}
                unit="GFLOPS"
                showDiffOnly={props.showDiffOnly}
            />

            <CompareItem<string | number | undefined>
                label="价格"
                leftValue={props.left?.price}
                rightValue={props.right?.price}
                format={formatDollar}
                compare={(left, right) => {
                    if (left === undefined || right === undefined) return undefined
                    if (left === right) return undefined
                    const leftNumber = extractFirstNumber(left)
                    const rightNumber = extractFirstNumber(right)
                    if (leftNumber === rightNumber) return undefined
                    if (isNaN(leftNumber) || isNaN(rightNumber)) return undefined

                    const bigger = Math.max(leftNumber, rightNumber);
                    if (leftNumber < rightNumber) {
                        return {
                            winner: 'left',
                            winnerRatio: leftNumber / bigger,
                            loserRatio: rightNumber / bigger
                        }
                    } else {
                        return {
                            winner: 'right',
                            winnerRatio: rightNumber / bigger,
                            loserRatio: leftNumber / bigger
                        }
                    }
                }}
                showDiffOnly={props.showDiffOnly}
            />
        </div>
    );
}
