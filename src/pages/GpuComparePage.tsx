import {useState} from "react";
import {defaultGpuSpecs, type GpuSpec} from "../data/gpu_specs.ts";
import {GpuSelect} from "../components/GpuSelect.tsx";
import {useSearchParams} from "react-router";
import {GpuCompareView} from "../components/GpuCompareView.tsx";
import {Switch} from "antd";
import {GpuVote} from "../components/GpuVote.tsx";

export function GpuComparePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const leftId = searchParams.get('left')
    const rightId = searchParams.get('right')

    const [gpuSpecs] = useState(defaultGpuSpecs)
    const [leftGpu, setLeftGpu] = useState<GpuSpec | undefined>(gpuSpecs.find(spec => spec.id === leftId))
    const handleLeftChange = (spec: GpuSpec | undefined) => {
        setLeftGpu(spec)
        searchParams.set('left', spec?.id ?? '')
        setSearchParams(searchParams)
    }
    const [rightGpu, setRightGpu] = useState<GpuSpec | undefined>(gpuSpecs.find(spec => spec.id === rightId))
    const handleRightChange = (spec: GpuSpec | undefined) => {
        setRightGpu(spec)
        searchParams.set('right', spec?.id ?? '')
        setSearchParams(searchParams)
    }

    const [showDiffOnly, setShowDiffOnly] = useState(true)

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridColumnGap: '1rem',
                }}
            >
                <GpuSelect
                    gpuSpecs={gpuSpecs}
                    value={leftGpu?.id}
                    onChange={handleLeftChange}
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                    }}
                />
                <GpuSelect
                    gpuSpecs={gpuSpecs}
                    value={rightGpu?.id}
                    onChange={handleRightChange}
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                    }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                }}
            >
                {leftGpu !== undefined ? <GpuVote id={leftGpu.id}/> : <div></div>}
                {rightGpu !== undefined ? <GpuVote id={rightGpu.id}/> : <div></div>}
            </div>

            <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                <label style={{paddingRight: '0.5rem'}}>只显示差异</label>
                <Switch value={showDiffOnly} onChange={setShowDiffOnly}/>
            </div>

            <GpuCompareView
                left={leftGpu}
                right={rightGpu}
                showDiffOnly={showDiffOnly}
            />
        </div>
    );
}