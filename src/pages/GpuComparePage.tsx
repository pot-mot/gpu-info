import {useState} from "react";
import {defaultGpuSpecs, type GpuSpec} from "../data/gpu_specs.ts";
import {GpuSelect} from "../components/GpuSelect.tsx";
import {GpuInfo} from "../components/GpuInfo.tsx";
import {useParams} from "react-router";

export function GpuComparePage() {
    const {id: initLeftId} = useParams<{ id: string }>();

    const [gpuSpecs] = useState(defaultGpuSpecs)
    const [leftGpu, setLeftGpu] = useState<GpuSpec | undefined>(gpuSpecs.find(spec => spec.id === initLeftId))
    const [rightGpu, setRightGpu] = useState<GpuSpec | undefined>(undefined)

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        }}>
            <div>
                <GpuSelect
                    gpuSpecs={gpuSpecs}
                    value={leftGpu?.id}
                    onChange={setLeftGpu}
                />
                {
                    leftGpu ? (
                        <GpuInfo
                            gpu={leftGpu}
                        />
                    ) : (
                        <></>
                    )
                }
            </div>

            <div>
                <GpuSelect
                    gpuSpecs={gpuSpecs}
                    value={rightGpu?.id}
                    onChange={setRightGpu}
                />
                {
                    rightGpu ? (
                        <GpuInfo
                            gpu={rightGpu}
                        />
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    );
}