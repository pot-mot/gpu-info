import {Button} from "antd";
import {useNavigate} from "react-router";

export function BrandsPage() {
    const navigate = useNavigate();

    const open = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <div className="page-container">
            <h2 className="page-title">GPU品牌</h2>
            <div className="brands-grid">
                <div className="brand-card" onClick={() => open("https://www.nvidia.cn/")}>
                    <h3>NVIDIA</h3>
                    <p>全球领先的GPU制造商，专注于游戏、数据中心和人工智能领域。</p>
                </div>
                <div className="brand-card" onClick={() => open("https://www.amd.com/zh-cn")}>
                    <h3>AMD</h3>
                    <p>提供高性能GPU解决方案，包括Radeon系列游戏显卡和Instinct系列数据中心GPU。</p>
                </div>
                <div className="brand-card" onClick={() => open("https://www.intel.com/content/www/cn/zh/homepage.html")}>
                    <h3>Intel</h3>
                    <p>通过Arc系列进入独立GPU市场，专注于集成显卡和独立显卡的融合发展。</p>
                </div>
            </div>

            <Button onClick={() => navigate('/brands/aggregate')}>查看历年发布</Button>
        </div>
    )
}
