import {useNavigate, useParams} from "react-router";
import { GpuDetail } from "../components/GpuDetail.tsx";
import { defaultGpuSpecs } from "../data/gpu_specs.ts";
import { useEffect, useState } from "react";
import type { GpuSpec } from "../data/gpu_specs.ts";
import {Button} from "antd";
import {GpuVote} from "../components/GpuVote.tsx";

export function GpuDetailPage() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [gpu, setGpu] = useState<GpuSpec | undefined>(undefined);

    useEffect(() => {
        // 根据ID查找对应的GPU规格
        const foundGpu = defaultGpuSpecs.find(spec => spec.id === id);
        setGpu(foundGpu)
    }, [id]);

    if (!gpu) {
        return <div>未找到GPU信息</div>;
    }

    const handleCompareClick = (gpuId: string) => {
        navigate(`/gpu/compare?left=${gpuId}`); // 跳转到对应 GPU 的详情页面
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>{gpu.name}</h1>

                <Button onClick={() => handleCompareClick(gpu.id)}>与其他GPU进行比较</Button>
            </div>

            <GpuDetail gpu={gpu} />

            <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'center'}}>
                <GpuVote id={gpu.id}/>
            </div>
        </div>
    );
}
