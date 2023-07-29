import { parseEther } from "viem"
import { Address, erc20ABI, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

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

export function Approve({ token, amount, spender }: Props) {
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
