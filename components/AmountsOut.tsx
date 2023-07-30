import { useContractRead } from "wagmi"
import { UniV2Router_ABI } from "../constants/UniV2"
import { AmountsOutProps } from "../types"

export default function AmountsOut({ router, tokenIn, tokenOut, amountIn }: AmountsOutProps) {
    const { data, isSuccess } = useContractRead({
        address: router,
        abi: UniV2Router_ABI,
        functionName: 'getAmountsOut',
        args: [amountIn, [tokenIn, tokenOut]]
    })

    console.log(`${isSuccess} The Router Result is ${data}`)

    return (
        <div>

        </div>
    )
}