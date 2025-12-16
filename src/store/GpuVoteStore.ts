import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import type {Immutable} from "immer";

interface GpuVoteState {
    votes: Immutable<Record<string, { vote: number, downVote: number }>>
    vote: (gpuId: string, count?: number) => void
    downVote: (gpuId: string, count?: number) => void
    getVote: (gpuId: string) => number
    getDownVote: (gpuId: string) => number
}

export const useGpuVoteStore = create<GpuVoteState>()(
    persist(
        immer((set, get) => ({
            votes: {},

            vote: (gpuId: string, count: number = 1) => set((state) => {
                if (!state.votes[gpuId]) {
                    state.votes[gpuId] = {vote: count, downVote: 0}
                } else {
                    state.votes[gpuId] = {
                        vote: state.votes[gpuId].vote + count,
                        downVote: state.votes[gpuId].downVote
                    }
                }
            }),
            downVote: (gpuId: string, count: number = 1) => set((state) => {
                if (!state.votes[gpuId]) {
                    state.votes[gpuId] = {vote: 0, downVote: count}
                } else {
                    state.votes[gpuId] = {
                        vote: state.votes[gpuId].vote,
                        downVote: state.votes[gpuId].downVote + count
                    }
                }
            }),

            getVote: (gpuId: string) => {
                return get().votes[gpuId]?.vote ?? 0
            },
            getDownVote: (gpuId: string) => {
                return get().votes[gpuId]?.downVote ?? 0
            },
        })),
        {
            name: 'gpu-vote',
            partialize: (state) => ({votes: state.votes}), // 只持久化 votes 字段
        }
    )
)
