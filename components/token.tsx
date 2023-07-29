import { useState } from "react";
import { bsc } from "viem/chains";
import { Address, Chain } from "wagmi";
import { BSC_UniV2Router_Address, ETH_UniV2Router_Address } from "../contract/Address";
import { AmountsOut, ExecuteSwap } from "./UniV2Router";
import { Allowance } from "./allowance";
import { TokenInfo } from "./tokenInfo";

interface Props {
    chain: (Chain & { unsupported?: boolean | undefined; }) | undefined
}

export function TokenSwap({ chain }: Props) {
    const [tokenIn, setTokenIn] = useState<Address>('0x')
    const [tokenOut, setTokenOut] = useState<Address>('0x')
    const [amountIn, setAmountIn] = useState<string>('')

    let router: Address = ETH_UniV2Router_Address

    switch (chain) {
        case bsc:
            router = BSC_UniV2Router_Address
            break;
    
        default:
            break;
    }

    return (
        <>
            <div>
                Input Token: <br />
                <input placeholder="Address Starting with 0x" onChange={(e) => setTokenIn(e.target.value as Address)} />
                <TokenInfo token={tokenIn} />
            </div>
            <div>
                <input placeholder="Token Amount to Swap" onChange={(e) => setAmountIn(e.target.value)} />
            </div>
            <Allowance token={tokenIn} amount={amountIn} spender={router} />
            <div>
                Output Token: <br />
                <input placeholder="Address Starting with 0x" onChange={(e) => setTokenOut(e.target.value as Address)} />
                <TokenInfo token={tokenOut} />
            </div>
            <ExecuteSwap {...{ router, tokenIn, tokenOut, amountIn }} />
            <AmountsOut {...{ router, tokenIn, tokenOut, amountIn }} />
        </>
    );
}


