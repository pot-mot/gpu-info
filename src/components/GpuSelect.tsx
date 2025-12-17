import type {GpuSpec} from "../data/gpu_specs.ts";
import {Select} from "antd";
import type {SelectProps} from "antd";
import type {CSSProperties} from "react";

export function GpuSelect(props: {
    gpuSpecs: GpuSpec[];
    value?: string;
    style?: CSSProperties;
    onChange?: (spec: GpuSpec | undefined) => void;
}) {
    const {gpuSpecs, value, onChange} = props;

    const options = gpuSpecs.map(spec => ({
        label: spec.name ?? '',
        value: spec.id
    })).sort((a, b) => a.label.localeCompare(b.label));

    const handleChange: SelectProps['onChange'] = (selectedId) => {
        const selectedSpec = gpuSpecs.find(spec => spec.id === selectedId);
        onChange?.(selectedSpec);
    };

    return (
        <Select
            style={{width: '100%', ...props.style}}
            placeholder="请选择GPU型号"
            options={options}
            value={value}
            onChange={handleChange}
            onClear={() => onChange?.(undefined)}
            showSearch={{
                optionFilterProp: 'label',
            }}
            allowClear
        />
    );
}
