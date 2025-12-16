import {useGpuVoteStore} from "../store/GpuVoteStore.ts";
import {Button} from "antd";

export function GpuVote(props: {
    id: string
}) {
    const voteStore = useGpuVoteStore()

    return (
        <div
            style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '0.5rem'}}
        >
            <Button color="cyan" variant="outlined" onClick={(e) => {
                e.stopPropagation()
                voteStore.vote(props.id)
            }}>
                👍 赞
                <span> {voteStore.getVote(props.id)}</span>
            </Button>
            <Button color="danger" variant="outlined" onClick={(e) => {
                e.stopPropagation()
                voteStore.downVote(props.id)
            }}>
                👎 踩
                <span> {voteStore.getDownVote(props.id)}</span>
            </Button>
        </div>
    )
}