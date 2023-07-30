import { Address } from "wagmi";

export interface TokenInfoProps {
    token: Address,
}

export interface ApproveProps {
    token: Address,
    amount: string,
    spender: Address
}

export interface AllowanceProps {
    token: Address,
    amount: string,
    spender: Address
}

export interface ExecuteSwapProps {
    router: Address,
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
}

export interface AmountsOutProps {
    router: Address,
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
}