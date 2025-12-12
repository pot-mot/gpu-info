import type { GpuSpec } from "../data/gpu_specs.ts";
import { Descriptions, Card, Typography } from 'antd';
const { Title } = Typography;

export function GpuInfo(props: {
    gpu: GpuSpec
}) {
    const { gpu } = props;

    // Helper function to format values with units
    const formatValueWithUnit = (value: string | number | undefined, unit: string = '') => {
        return value !== undefined && value !== null ? `${value} ${unit}` : 'N/A';
    }

    return (
        <Card>
            <Title level={2}>{gpu.manufacturer} {gpu.name}</Title>

            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="制造商">{gpu.manufacturer ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="型号名称">{gpu.name ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="GPU芯片">{gpu.gpu_name ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="世代">{gpu.generation ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="架构">{gpu.architecture ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="晶圆厂">{gpu.foundry ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="工艺制程">{formatValueWithUnit(gpu.process_size_nm, 'nm')}</Descriptions.Item>
                <Descriptions.Item label="晶体管数量">{formatValueWithUnit(gpu.transistor_count_m, 'M')}</Descriptions.Item>
                <Descriptions.Item label="晶体管密度">{formatValueWithUnit(gpu.transistor_density_k_mm2, 'K/mm²')}</Descriptions.Item>
                <Descriptions.Item label="芯片面积">{formatValueWithUnit(gpu.die_size_mm2, 'mm²')}</Descriptions.Item>
                <Descriptions.Item label="封装类型">{gpu.chip_package ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="发布日期">{gpu.release_date ? new Date(gpu.release_date).toLocaleDateString() : 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="总线接口">{gpu.bus_interface ?? 'N/A'}</Descriptions.Item>

                <Descriptions.Item label="基础频率">{formatValueWithUnit(gpu.base_clock_mhz, 'MHz')}</Descriptions.Item>
                <Descriptions.Item label="加速频率">{formatValueWithUnit(gpu.boost_clock_mhz, 'MHz')}</Descriptions.Item>

                <Descriptions.Item label="显存频率">{formatValueWithUnit(gpu.memory_clock_mhz, 'MHz')}</Descriptions.Item>
                <Descriptions.Item label="显存容量">{formatValueWithUnit(gpu.memory_size_gb, 'GB')}</Descriptions.Item>
                <Descriptions.Item label="显存位宽">{formatValueWithUnit(gpu.memory_bus_bits, 'bit')}</Descriptions.Item>
                <Descriptions.Item label="显存带宽">{formatValueWithUnit(gpu.memory_bandwidth_gb_s, 'GB/s')}</Descriptions.Item>
                <Descriptions.Item label="显存类型">{gpu.memory_type ?? 'N/A'}</Descriptions.Item>

                <Descriptions.Item label="着色单元">{formatValueWithUnit(gpu.shading_units)}</Descriptions.Item>
                <Descriptions.Item label="纹理映射单元">{formatValueWithUnit(gpu.texture_mapping_units)}</Descriptions.Item>
                <Descriptions.Item label="渲染输出处理器">{formatValueWithUnit(gpu.render_output_processors)}</Descriptions.Item>
                <Descriptions.Item label="流式多处理器">{formatValueWithUnit(gpu.streaming_multiprocessors)}</Descriptions.Item>
                <Descriptions.Item label="张量核心">{formatValueWithUnit(gpu.tensor_cores)}</Descriptions.Item>
                <Descriptions.Item label="光线追踪核心">{formatValueWithUnit(gpu.ray_tracing_cores)}</Descriptions.Item>

                <Descriptions.Item label="一级缓存">{formatValueWithUnit(gpu.l1_cache_kb, 'KB')}</Descriptions.Item>
                <Descriptions.Item label="二级缓存">{formatValueWithUnit(gpu.l2_cache_mb, 'MB')}</Descriptions.Item>

                <Descriptions.Item label="热设计功耗">{formatValueWithUnit(gpu.thermal_design_power_w, 'W')}</Descriptions.Item>
                <Descriptions.Item label="板卡长度">{formatValueWithUnit(gpu.board_length_mm, 'mm')}</Descriptions.Item>
                <Descriptions.Item label="板卡宽度">{formatValueWithUnit(gpu.board_width_mm, 'mm')}</Descriptions.Item>
                <Descriptions.Item label="板卡插槽宽度">{gpu.board_slot_width ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="建议电源功率">{formatValueWithUnit(gpu.suggested_psu_w, 'W')}</Descriptions.Item>
                <Descriptions.Item label="电源接口">{gpu.power_connectors ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="显示接口">{gpu.display_connectors ?? 'N/A'}</Descriptions.Item>

                <Descriptions.Item label="DirectX版本">
                    {gpu.directx_major_version !== undefined && gpu.directx_minor_version !== undefined
                        ? `${gpu.directx_major_version}.${gpu.directx_minor_version}`
                        : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="OpenGL版本">
                    {gpu.opengl_major_version !== undefined && gpu.opengl_minor_version !== undefined
                        ? `${gpu.opengl_major_version}.${gpu.opengl_minor_version}`
                        : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Vulkan版本">
                    {gpu.vulkan_major_version !== undefined && gpu.vulkan_minor_version !== undefined
                        ? `${gpu.vulkan_major_version}.${gpu.vulkan_minor_version}`
                        : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="OpenCL版本">
                    {gpu.opencl_major_version !== undefined && gpu.opencl_minor_version !== undefined
                        ? `${gpu.opencl_major_version}.${gpu.opencl_minor_version}`
                        : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="CUDA版本">
                    {gpu.cuda_major_version !== undefined && gpu.cuda_minor_version !== undefined
                        ? `${gpu.cuda_major_version}.${gpu.cuda_minor_version}`
                        : 'N/A'}
                </Descriptions.Item>

                <Descriptions.Item label="像素率">{formatValueWithUnit(gpu.pixel_rate_gpixel_s, 'GPixel/s')}</Descriptions.Item>
                <Descriptions.Item label="纹理率">{formatValueWithUnit(gpu.texture_rate_gtexel_s, 'GTexel/s')}</Descriptions.Item>
                <Descriptions.Item label="半精度性能">{formatValueWithUnit(gpu.half_float_performance_gflop_s, 'GFLOPS')}</Descriptions.Item>
                <Descriptions.Item label="单精度性能">{formatValueWithUnit(gpu.single_float_performance_gflop_s, 'GFLOPS')}</Descriptions.Item>
                <Descriptions.Item label="双精度性能">{formatValueWithUnit(gpu.double_float_performance_gflop_s, 'GFLOPS')}</Descriptions.Item>

                <Descriptions.Item label="价格">{
                    gpu.price === undefined ? 'N/A' :
                        typeof gpu.price === 'number' ? "$" + gpu.price : gpu.price
                }</Descriptions.Item>

                {gpu.tpu_url && (
                    <Descriptions.Item label="TechPowerUp链接">
                        <a href={gpu.tpu_url} target="_blank" rel="noopener noreferrer">查看详情</a>
                    </Descriptions.Item>
                )}
                {/*<Descriptions.Item label="TechPowerUp评分">{gpu.tpu_review_data ?? 'N/A'}</Descriptions.Item>*/}
                {gpu.jd && (
                    <Descriptions.Item label="京东链接">
                        <a href={gpu.jd} target="_blank" rel="noopener noreferrer">购买链接</a>
                    </Descriptions.Item>
                )}
            </Descriptions>
        </Card>
    );
}
