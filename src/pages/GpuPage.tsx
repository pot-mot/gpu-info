import GpuInfoTable from "../components/GpuInfoTable.tsx";
import {useState} from "react";
import {defaultGpuInfos} from "../data/gpuInfo.ts";

function GpuPage() {
    const [gpuInfos] = useState(defaultGpuInfos)

    return (
        <div>
            <GpuInfoTable gpuInfos={gpuInfos}/>
        </div>
    )
}

export default GpuPage
