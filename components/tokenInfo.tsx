import { Address, useToken } from "wagmi"

interface Props {
    token: Address,
}

export function TokenInfo({ token }: Props) {
    const { data, isError, isLoading } = useToken({
        address: token
    })

    return (
        <div>
            {isLoading && <div>Fetching token…</div>}
            {isError ? <div>Token Address Error</div> : <div>Token Symbol: {data?.symbol} <br /> Token Decimals: {data?.decimals} </div>}
        </div>
    )
}
