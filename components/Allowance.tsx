import { parseEther } from "viem"
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi"
import { AllowanceProps } from "../types"
import Approve from "./Approve"

export default function Allowance({ token, amount, spender }: AllowanceProps) {
    const { address } = useAccount()
    const { data } = useContractRead({
        address: token,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [address as Address, spender]
    })

    const insufficiency: boolean = data as bigint < parseEther(amount)

    return (
        <div>
            {insufficiency && <Approve token={token} amount={amount} spender={spender} />}
        </div>
    )
}
