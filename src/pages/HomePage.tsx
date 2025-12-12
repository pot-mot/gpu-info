import {defaultGpuSpecs} from '../data/gpu_specs.ts'
import {numberSorter} from "../utils/number.ts";
import {useNavigate} from "react-router";

export function HomePage() {
    const navigate = useNavigate();

    // 获取热门GPU
    const topGpus = defaultGpuSpecs
        .filter(gpu => (gpu.memory_size_gb ?? 0) > 20)
        .sort((a, b) => numberSorter(b.price, a.price, 'descend'))
        .slice(0, 6)

    const handleGpuClick = (gpuId: string) => {
        navigate(`/gpu/${gpuId}`); // 跳转到对应 GPU 的详情页面
    };

    return (
        <div className="home-page">
            {/* 轮播图区域 */}
            <div className="hero-banner">
                <div className="hero-content">
                    <h2>探索GPU科技的无限可能</h2>
                    <p>从游戏娱乐到人工智能，GPU正在改变我们的世界</p>
                </div>
            </div>

            {/* 热门GPU推荐 */}
            <section className="section">
                <h2 className="section-title">热门GPU推荐</h2>
                <div className="gpu-grid">
                    {topGpus.map((gpu) => (
                        <div
                            className="gpu-card"
                            key={gpu.id}
                            onClick={() => handleGpuClick(gpu.id)}
                        >
                            <h3 className="gpu-name">{gpu.name}</h3>
                            <div className="gpu-specs">
                                <p><strong>价格:</strong> {gpu.price} 元</p>
                                <p><strong>显存:</strong> {gpu.memory_size_gb}GB</p>
                                <p><strong>频率:</strong> {gpu.boost_clock_mhz}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 技术趋势 */}
            <section className="section trends-section">
                <h2 className="section-title">GPU技术趋势</h2>
                <div className="trends-grid">
                    <div className="trend-card">
                        <h3>AI加速</h3>
                        <p>GPU在人工智能训练和推理中的应用日益广泛</p>
                    </div>
                    <div className="trend-card">
                        <h3>光线追踪</h3>
                        <p>实时光线追踪技术为游戏带来革命性视觉体验</p>
                    </div>
                    <div className="trend-card">
                        <h3>高性能计算</h3>
                        <p>GPU加速科学计算和数据分析</p>
                    </div>
                    <div className="trend-card">
                        <h3>能效优化</h3>
                        <p>新一代GPU实现更高性能与更低功耗</p>
                    </div>
                </div>
            </section>

            {/* 应用场景 */}
            <section className="section">
                <h2 className="section-title">GPU应用场景</h2>
                <div className="applications-grid">
                    <div className="application-card">
                        <h3>游戏娱乐</h3>
                        <p>流畅的游戏体验和逼真的视觉效果</p>
                    </div>
                    <div className="application-card">
                        <h3>人工智能</h3>
                        <p>深度学习和机器学习模型训练</p>
                    </div>
                    <div className="application-card">
                        <h3>数据中心</h3>
                        <p>大规模并行计算和云计算</p>
                    </div>
                    <div className="application-card">
                        <h3>自动驾驶</h3>
                        <p>实时图像处理和决策支持</p>
                    </div>
                </div>
            </section>
        </div>
    )
}