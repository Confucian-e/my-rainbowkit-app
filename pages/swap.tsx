import { useNetwork } from "wagmi";
import { TokenSwap } from "../components/token";


export default function Swap() {
    const { chain } = useNetwork()

    return (
        <TokenSwap chain={chain}/>
    );
}