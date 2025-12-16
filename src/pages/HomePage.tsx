import {defaultGpuSpecs} from '../data/gpu_specs.ts'
import {numberSorter} from "../utils/number.ts";
import {useNavigate} from "react-router";
import {formatDollar} from "../utils/format.ts";

const GOOD_GPU_YEAR_DIFF = 1
const GOOD_GPU_MEMORY_SIZE_GB = 12

export function HomePage() {
    const navigate = useNavigate();

    // 获取热门GPU
    const topGpus = defaultGpuSpecs
        .filter(gpu => (gpu.memory_size_gb ?? 0) >= GOOD_GPU_MEMORY_SIZE_GB)
        .filter(gpu => {
            if (!gpu.release_date) return false;

            const releaseDate = new Date(gpu.release_date)
            const threeYearsAgo = new Date()
            threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - GOOD_GPU_YEAR_DIFF)

            return releaseDate >= threeYearsAgo;
        })
        .filter(gpu => !!gpu.price)
        .sort((a, b) => {
            if (a.release_date && b.release_date) {
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
            }
            return numberSorter(a.price, b.price, "descend")
        })
        .slice(0, 9)

    const handleGpuClick = (gpuId: string) => {
        navigate(`/gpu/${gpuId}`); // 跳转到对应 GPU 的详情页面
    };

    return (
        <div className="home-page">
            <section className="section">
                <h2 className="section-title">近期GPU</h2>
                <div className="gpu-grid">
                    {topGpus.map((gpu) => (
                        <div
                            className="gpu-card"
                            key={gpu.id}
                            onClick={() => handleGpuClick(gpu.id)}
                        >
                            <h3 className="gpu-name">{gpu.name}</h3>
                            <div className="gpu-specs">
                                <p><strong>显存</strong> {gpu.memory_size_gb} GB ({gpu.memory_type})</p>
                                <p><strong>发布于</strong> {gpu.release_date ? new Date(gpu.release_date).toLocaleDateString() : ''}</p>
                                <p><strong>价格</strong> {formatDollar(gpu.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}