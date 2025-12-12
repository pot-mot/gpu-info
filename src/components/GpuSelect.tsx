import type { GpuSpec } from "../data/gpu_specs.ts";
import { Select } from "antd";
import type { SelectProps } from "antd";

export function GpuSelect(props: {
    gpuSpecs: GpuSpec[];
    value?: string;
    onChange?: (spec: GpuSpec | undefined) => void;
}) {
    const { gpuSpecs, value, onChange } = props;

    const options = gpuSpecs.map(spec => ({
        label: spec.name,
        value: spec.id
    }));

    const handleChange: SelectProps['onChange'] = (selectedId) => {
        const selectedSpec = gpuSpecs.find(spec => spec.id === selectedId);
        onChange?.(selectedSpec);
    };

    return (
        <Select
            style={{ width: '100%' }}
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
