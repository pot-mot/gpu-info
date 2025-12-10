import {useState} from "react";
import {GpuSpecTable} from "../components/GpuSpecTable.tsx";
import {defaultGpuSpecs} from "../data/gpu_specs.ts";

function GpuPage() {
    const [gpuSpecs] = useState(defaultGpuSpecs)

    return (
        <div>
            <GpuSpecTable gpuSpecs={gpuSpecs}/>
        </div>
    )
}

export default GpuPage
