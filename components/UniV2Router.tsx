import { Address, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { UniV2Router_ABI } from "../contract/UniV2"

interface Props {
    router: Address,
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
}

export function AmountsOut({ router, tokenIn, tokenOut, amountIn }: Props) {
    const { data, isSuccess } = useContractRead({
        address: router,
        abi: UniV2Router_ABI,
        functionName: 'getAmountsOut',
        args: [amountIn, [tokenIn, tokenOut]]
    })

    console.log(`${isSuccess} The Router Result is ${data}`)

    return (
        <div>
            <h3>Amount Out is ${ }</h3>
        </div>
    )
}

export function ExecuteSwap({ router, tokenIn, tokenOut, amountIn }: Props) {
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