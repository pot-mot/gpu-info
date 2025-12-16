import type {GpuSpec} from "../data/gpu_specs.ts";
import styles from "./BarChart.module.css";
import {type ReactElement, useState} from "react";
import {GpuSpecTable} from "./GpuSpecTable.tsx";
import {Tabs} from "antd";
import TabPane from "antd/es/tabs/TabPane";

const getManufacturerYearGpus = (
    gpuSpecs: GpuSpec[]
): Map<string, Map<number, GpuSpec[]>> => {
    const result = new Map<string, Map<number, GpuSpec[]>>()

    for (const gpu of gpuSpecs) {
        if (gpu.manufacturer === undefined || gpu.release_date === undefined) continue;

        const manufacturer = gpu.manufacturer;
        const year = new Date(gpu.release_date).getFullYear();

        let currentManufacturerData = result.get(manufacturer)
        if (currentManufacturerData === undefined) {
            currentManufacturerData = new Map<number, GpuSpec[]>()
            result.set(manufacturer, currentManufacturerData)
        }

        const currentYearGpus = currentManufacturerData.get(year)
        if (currentYearGpus === undefined) {
            currentManufacturerData.set(year, [gpu])
        } else {
            currentYearGpus.push(gpu)
        }
    }

    return result;
};

// 获取所有年份范围
const getYearRange = (yearCounts: Map<number, GpuSpec[]>) => {
    if (yearCounts.size === 0) return {minYear: undefined, maxYear: undefined};

    let minYear: number = Infinity;
    let maxYear: number = -Infinity;

    for (const [year] of yearCounts) {
        if (year < minYear) minYear = year;
        if (year > maxYear) maxYear = year;
    }

    return {minYear, maxYear};
};

// 获取最大值用于计算比例
const getMaxCount = (yearGpus: Map<number, GpuSpec[]>) => {
    let maxCount = 0;

    for (const gpus of yearGpus.values()) {
        if (gpus.length > maxCount) maxCount = gpus.length;
    }

    return maxCount;
};

export function BrandAggregateView(props: {
    gpuSpecs: GpuSpec[];
}) {
    const manufacturerYearGpus = getManufacturerYearGpus(props.gpuSpecs)

    const firstManufacturerYearGpus = manufacturerYearGpus.entries().next().value
    const firstShowManufacturer = firstManufacturerYearGpus?.[0]
    const firstYearGpus = firstManufacturerYearGpus?.[1]
    const {maxYear} = getYearRange(firstYearGpus ?? new Map())
    const [showManufacturer, setShowManufacturer] = useState<string | undefined>(firstShowManufacturer)
    const [showYear, setShowYear] = useState<number | undefined>(maxYear)
    const [showGpuSpecs, setShowGpuSpecs] = useState<GpuSpec[] | undefined>(() => {
        if (maxYear === undefined) return
        return firstYearGpus?.get(maxYear)
    })

    const handleManufacturerChange = (manufacturer: string) => {
        setShowManufacturer(manufacturer)

        const yearGpus = manufacturerYearGpus.get(manufacturer)
        if (yearGpus === undefined) return;

        const {minYear, maxYear} = getYearRange(yearGpus);
        if (minYear === undefined || maxYear === undefined) return;

        const gpus = yearGpus.get(maxYear) ?? []
        setShowGpuSpecs(gpus)
        setShowYear(maxYear)
    }

    const handleYearChange = (year: number, gpus: GpuSpec[]) => {
        setShowYear(year)
        setShowGpuSpecs(gpus)
    }

    const manufacturerBars: ReactElement[] = []

    for (const [manufacturer, yearGpus] of manufacturerYearGpus) {
        const {minYear, maxYear} = getYearRange(yearGpus);
        if (minYear === undefined || maxYear === undefined) continue;

        const barItems: ReactElement[] = []

        const maxCount = getMaxCount(yearGpus);
        for (let year = maxYear; year >= minYear; year--) {
            const gpus = yearGpus.get(year) ?? []
            const count = gpus.length;

            barItems.push(
                <div
                    key={year}
                    className={styles.bar}
                >
                    <div className={styles.barValueWrapper}>
                        <div className={styles.barValue} style={{height: count * 100 / maxCount + "%"}}/>
                        <div className={styles.barLabel}>{count}</div>
                    </div>
                    <div className={`${styles.label} ${styles.hoverStyle} ${showManufacturer === manufacturer && showYear === year ? styles.activeStyle : ''}`}
                         onClick={() => handleYearChange(year, gpus)}>{year}</div>
                </div>
            );
        }
        manufacturerBars.push(
            <TabPane key={manufacturer} tabKey={manufacturer} tab={manufacturer}>
                <div className={styles.label}>{manufacturer}</div>
                <div className={styles.container} style={{height: "30vh"}}>
                    <div
                        key={manufacturer}
                        className={styles.bars}
                    >
                        {barItems}
                    </div>
                </div>
            </TabPane>
        );
    }

    return (
        <>
            <Tabs defaultActiveKey={showManufacturer} onChange={(key) => handleManufacturerChange(key)}>
                {manufacturerBars}
            </Tabs>
            {showGpuSpecs !== undefined && showGpuSpecs.length > 0 && (<GpuSpecTable gpuSpecs={showGpuSpecs}/>)}
        </>
    )
}
