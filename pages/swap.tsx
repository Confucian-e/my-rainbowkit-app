import { Allowance, AmountsOut, ExecuteSwap, TokenInfo } from "../components";
import { useState } from "react";
import { bsc } from "viem/chains";
import { Address, useNetwork } from "wagmi";
import { BSC_UniV2Router_Address, ETH_UniV2Router_Address } from "../constants/Address";
import styles from '../styles/Home.module.css';


export default function Swap() {
    const { chain } = useNetwork()

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
            <div className={styles.title}>
                Input Token: &nbsp;&nbsp;&nbsp;&nbsp;
                <input placeholder="Address Starting with 0x" onChange={(e) => setTokenIn(e.target.value as Address)} />
                <TokenInfo token={tokenIn} />
            </div>
            <div className={styles.title}>
                Amount To Swap: &nbsp;&nbsp;&nbsp;&nbsp;
                <input placeholder="Token Amount to Swap" onChange={(e) => setAmountIn(e.target.value)} />
            </div>
            <div>
                <Allowance token={tokenIn} amount={amountIn} spender={router} />
            </div>
            <div className={styles.title}>
                Output Token: &nbsp;&nbsp;&nbsp;&nbsp;
                <input placeholder="Address Starting with 0x" onChange={(e) => setTokenOut(e.target.value as Address)} />
                <TokenInfo token={tokenOut} />
            </div>
            <div className={styles.title}>
                <ExecuteSwap {...{ router, tokenIn, tokenOut, amountIn }} />
                <AmountsOut {...{ router, tokenIn, tokenOut, amountIn }} />
            </div>
        </>
    );
}