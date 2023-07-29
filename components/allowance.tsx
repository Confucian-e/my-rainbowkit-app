import { parseEther } from "viem"
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi"
import { Approve } from "./approve"

interface Props {
    token: Address,
    amount: string,
    spender: Address
}

export function Allowance({ token, amount, spender }: Props) {
    const { address } = useAccount()
    const { data, isError, isLoading } = useContractRead({
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