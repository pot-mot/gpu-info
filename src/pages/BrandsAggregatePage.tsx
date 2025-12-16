import {useState} from "react";
import {defaultGpuSpecs} from "../data/gpu_specs.ts";
import {BrandAggregateView} from "../components/BrandAggregateView.tsx";

export function BrandsAggregatePage() {
    const [gpuSpecs] = useState(defaultGpuSpecs);

    return (
        <>
            <BrandAggregateView gpuSpecs={gpuSpecs}/>
        </>
    );
}