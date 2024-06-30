import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useWallet, useConnex } from '@vechain/dapp-kit-react';
import { formatUnits } from '@ethersproject/units';

export const TokenTransactions = () => {
    const wallet = useWallet();
    const connex = useConnex();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const formatTokenValue = (value) => {
        // VET has 18 decimals
        return parseFloat(formatUnits(value, 18));
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!wallet.account || !connex) return;
            setIsLoading(true);
            setError(null);

            try {
                const transferABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"};

                const transfers = await connex.thor
                    .account('0x0000000000000000000000000000456E65726779')
                    .event(transferABI)
                    .filter([
                        {_from: wallet.account},
                        {_to: wallet.account}
                    ])
                    .order('desc')
                    .apply(0, 100);

                const formattedTransactions = transfers.map(tx => ({
                    date: new Date(tx.meta.blockTimestamp * 1000).toLocaleDateString(),
                    amount: formatTokenValue(tx.decoded._value),
                    type: tx.decoded._from === wallet.account?.toLowerCase() ? 'out' : 'in'
                }));

                setTransactions(formattedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
                setError('Failed to fetch transactions. Please try again later.');
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [wallet.account, connex]);

    if (!wallet.account) {
        return <div>Please connect your wallet</div>;
    }

    function shortenAddress(address, chars = 6) {
        return `${address.substring(0, 4)}...${address.substring(address.length - chars)}`;
    }

    return (
        <Card mt={3} w={"full"}>
            <VStack spacing={4} align="stretch" p={3}>
                <Heading size="md">Energy Rewards for {shortenAddress(wallet.account)}</Heading>
                {isLoading && <Text>Loading transactions...</Text>}
                {error && <Text color="red.500">{error}</Text>}
                {!isLoading && !error && transactions.length > 0 && (
                    <Box height="400px">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={transactions}>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="amount" name="Vedge🍆 AI Energy Rewards"
                                     fill={(entry) => entry.type === 'Received' ? '#82ca9d' : '#8884d8'}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
                {!isLoading && !error && transactions.length === 0 && (
                    <Text>No transactions found for this wallet.</Text>
                )}
            </VStack>
        </Card>
    );
};
