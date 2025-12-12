import { useParams } from "react-router";
import { GpuInfo } from "../components/GpuInfo.tsx";
import { defaultGpuSpecs } from "../data/gpu_specs.ts";
import { useEffect, useState } from "react";
import type { GpuSpec } from "../data/gpu_specs.ts";

export function GpuDetailPage() {
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

    return (
        <div>
            <GpuInfo gpu={gpu} />
        </div>
    );
}
