import { Address, useToken } from "wagmi"
import { TokenInfoProps } from "../types"

function TokenInfo({ token }: TokenInfoProps) {
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

export default TokenInfo