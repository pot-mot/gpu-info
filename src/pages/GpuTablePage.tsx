import {useState} from "react";
import {GpuSpecTable} from "../components/GpuSpecTable.tsx";
import {defaultGpuSpecs} from "../data/gpu_specs.ts";
import {useNavigate} from "react-router";
import { Button } from "antd";

function GpuTablePage() {
    const navigate = useNavigate();

    const [gpuSpecs] = useState(defaultGpuSpecs)

    const toSort = () => {
        navigate('/gpu/sort')
    }

    return (
        <>
            <Button onClick={toSort}>查看榜单</Button>
            <GpuSpecTable gpuSpecs={gpuSpecs}/>
        </>
    )
}

export default GpuTablePage
