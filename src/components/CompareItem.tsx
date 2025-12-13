import type {ReactNode} from "react";
import {formatValueWithUnit} from "../utils/format.ts";

const WIN_COLOR = "#80ca28"
const LOSE_COLOR = "#f81717"

export type CompareResult = {
    winner: "left" | "right",
    winnerRatio: number
    loserRatio: number
}

export type CompareItemProps<T> = {
    label: string
    leftValue: T
    rightValue: T
    format: (value: T) => string
    compare?: (leftValue: T, rightValue: T) => CompareResult | undefined
    winColor?: string
    loseColor?: string
    showDiffOnly?: boolean
}

export function CompareItem<T>(
    {
        label,
        leftValue,
        rightValue,
        format,
        compare = () => undefined,
        winColor = WIN_COLOR,
        loseColor = LOSE_COLOR,
        showDiffOnly = false
    }: CompareItemProps<T>
): ReactNode {
    const compareResult = compare(leftValue, rightValue)
    if (showDiffOnly && (compareResult === undefined && leftValue === rightValue)) return null

    const formattedLeftValue = format(leftValue)
    const formattedRightValue = format(rightValue)

    return (
        <>
            <div style={{
                lineHeight: '2rem',
                fontSize: '1rem',
                textAlign: 'center'
            }}>
                {label}
            </div>
            {compareResult !== undefined ? (
                <div style={{
                    lineHeight: '1.5rem',
                    fontSize: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '10rem 1fr 1fr 10rem'
                }}>
                    <div style={{textAlign: 'left'}}>
                        {formattedLeftValue}
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        height: '100%',
                        alignItems: 'center'
                    }}>
                        <div
                            style={{
                                width: compareResult.winner === "left" ? compareResult.winnerRatio * 100 + "%" : compareResult.loserRatio * 100 + "%",
                                backgroundColor: compareResult.winner === "left" ? winColor : loseColor,
                                height: '10px',
                                borderRadius: '5px 0 0 5px'
                            }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        height: '100%',
                        alignItems: 'center'
                    }}>
                        <div
                            style={{
                                width: compareResult.winner === "right" ? compareResult.winnerRatio * 100 + "%" : compareResult.loserRatio * 100 + "%",
                                backgroundColor: compareResult.winner === "right" ? winColor : loseColor,
                                height: '10px',
                                borderRadius: '0 5px 5px 0'
                            }}
                        />
                    </div>
                    <div style={{textAlign: 'right'}}>
                        {formattedRightValue}
                    </div>
                </div>
            ) : (
                <div style={{
                    lineHeight: '1.5rem',
                    fontSize: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div style={{textAlign: 'left'}}>
                        {formattedLeftValue}
                    </div>
                    <div style={{textAlign: 'right'}}>
                        {formattedRightValue}
                    </div>
                </div>
            )}
        </>
    );
}

export const NumberCompareItem = (
    props: {
        unit?: string,
        format?: (value: number | undefined) => string,
        numberCompare?: (left: number, right: number) => boolean | undefined
    } & Omit<CompareItemProps<number | undefined>, 'format'>
): ReactNode => {
    return CompareItem<number | undefined>({
        ...props,
        compare: (left: number | undefined, right: number | undefined) => {
            if (props.compare !== undefined) return props.compare(left, right)

            if (left === undefined || right === undefined) return undefined
            if (isNaN(left) || isNaN(right)) return undefined
            if (left === right) return undefined

            let isLeftWin: boolean | undefined
            if (props.numberCompare === undefined) {
                isLeftWin = left > right
            } else {
                isLeftWin = props.numberCompare(left, right)
                if (isLeftWin === undefined) return undefined
            }

            const bigger = Math.max(left, right)
            if (isLeftWin) {
                return {
                    winner: "left",
                    winnerRatio: left / bigger,
                    loserRatio: right / bigger
                }
            } else {
                return {
                    winner: "right",
                    winnerRatio: right / bigger,
                    loserRatio: left / bigger
                }
            }
        },
        format: (value: number | undefined): string => {
            if (value === undefined) return "N/A"
            if (props.format !== undefined) return props.format(value)
            if (props.unit === undefined) return String(value)
            return formatValueWithUnit(value, props.unit)
        },
    })
}

export const StringCompareItem = (
    props: Omit<CompareItemProps<string | undefined>, 'format'>
): ReactNode => {
    return CompareItem<string | undefined>({
        ...props,
        format: (value: string | undefined): string => {
            if (value === undefined) return "N/A"
            return value
        },
    })
}
