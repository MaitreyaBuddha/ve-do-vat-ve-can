import {Card, Flex} from "@chakra-ui/react";
import {Step} from "./Step";

import {
    EarthLock as WalletIcon,
    BrainCircuit as DownloadIcon,
    HandCoins as EarnIcon,
} from "lucide-react";

const Steps = [
    {
        icon: (<WalletIcon size={144} color="green"/>),
        title: "Connect your wallet",
        description: "Connect your wallet to the network.",
    },
    {
        icon: (<DownloadIcon size={144} color="green"/>),
        title: "Download and run the Container",
        description: "Provide AI inference compute capacity to the network.",
    },
    {
        icon: (<EarnIcon size={144} color="green"/>),
        title: "Earn rewards",
        description: "Earn more Vedge🍆 for providing compute with green energy.",
    },
];

export const Instructions = () => {
    return (
        <Card mt={3} w={"full"}>
            <Flex
                p={{base: 4}}
                w="100%"
                direction={{base: "column", md: "row"}}
            >
                {Steps.map((step, index) => (
                    <Step key={index} {...step} />
                ))}
            </Flex>
        </Card>
    );
};
