import { parseEther } from "viem"
import { erc20ABI, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"
import { ApproveProps } from "../types"

export default function Approve({ token, amount, spender }: ApproveProps) {
    const { config } = usePrepareContractWrite({
        address: token,
        abi: erc20ABI,
        functionName: 'approve',
        args: [spender, parseEther(amount)]
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <button onClick={() => write?.()}>Approve</button><br />
            {isLoading && <div>Tx Pending</div>}
            {isSuccess && <div>Tx Success, tx hash: {data?.hash}</div>}
        </div>
    )
}