import type {CSSProperties, ReactElement} from "react";
import styles from './SortChart.module.css';

export function SortChart<T extends { id: string }>(props: {
    data: T[],
    limit: number,
    prop: keyof T,
    direction: "asc" | "desc",
    value: (item: T) => ReactElement,
    label: (item: T) => ReactElement,
    containerStyle?: CSSProperties,
    barStyle?: CSSProperties
}) {
    const getTopItems = () => {
        const filteredData = props.data
            .filter(item => {
                const value = item[props.prop]
                if (value === undefined || value === null) {
                    return false
                }
                if (typeof value !== "number") {
                    return false
                }
                const numberValue = value as number
                return !isNaN(numberValue) && numberValue !== Infinity && numberValue !== -Infinity
            })
            .map(item => ({
                item,
                value: item[props.prop] as number
            }))

        if (props.limit >= filteredData.length) {
            if (props.direction === "asc") {
                return filteredData.sort((a, b) => a.value - b.value)
            } else {
                return filteredData.sort((a, b) => b.value - a.value)
            }
        } else {
            if (props.direction === "asc") {
                const sorter = (a: { value: number }, b: { value: number }) => a.value - b.value
                quickSelect(filteredData, props.limit - 1, sorter)
                return filteredData.slice(0, props.limit).sort(sorter)
            } else {
                const sorter = (a: { value: number }, b: { value: number }) => b.value - a.value
                quickSelect(filteredData, props.limit - 1, sorter)
                return filteredData.slice(0, props.limit).sort(sorter)
            }
        }
    };

    const topItems = getTopItems()
    const maxValue = Math.max(...topItems.map(i => i.value))

    return (
        <div className={styles.container} style={props.containerStyle}>
            <div className={styles.bars}>
                {topItems.map(({item, value}) => (
                    <div
                        className={styles.bar}
                        style={props.barStyle}
                    >
                        <div key={item.id} className={styles.barValueWrapper}>
                            <div
                                className={styles.barValue}
                                style={{height: value * 100 / maxValue + "%"}}
                            />
                            <span className={styles.barLabel}>
                                {props.value(item)}
                            </span>
                        </div>
                        <div className={styles.label}>
                            {props.label(item)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 快速选择算法
function quickSelect<T>(array: T[], k: number, compareFn: (a: T, b: T) => number): void {
    if (array.length <= 1) return;

    let left = 0;
    let right = array.length - 1;

    while (left < right) {
        const pivotIndex = partition(array, left, right, compareFn);

        if (pivotIndex === k) {
            return;
        } else if (pivotIndex < k) {
            left = pivotIndex + 1;
        } else {
            right = pivotIndex - 1;
        }
    }
}

function partition<T>(array: T[], left: number, right: number, compareFn: (a: T, b: T) => number): number {
    const pivotValue = array[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (compareFn(array[j], pivotValue) < 0) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }

    [array[i], array[right]] = [array[right], array[i]];
    return i;
}
