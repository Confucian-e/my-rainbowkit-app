import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { UniV2Router_ABI } from "../constants/UniV2"
import { ExecuteSwapProps } from "../types"

export default function ExecuteSwap({ router, tokenIn, tokenOut, amountIn }: ExecuteSwapProps) {
    const { address } = useAccount()
    const { config } = usePrepareContractWrite({
        address: router,
        abi: UniV2Router_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [amountIn, 0, [tokenIn, tokenOut], address, Date.now() + 1e4]
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <div>
            <button onClick={() => write?.()}>Swap</button>
            {isLoading && <div>Tx Pending</div>}
            {isSuccess && <div>Tx Success, tx hash: {data?.hash}</div>}
        </div>
    )
}