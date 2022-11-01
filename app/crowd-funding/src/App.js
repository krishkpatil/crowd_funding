import React, {Children, FC, ReactNode, useMemo} from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Button,
  useToast,
  Code,
  HStack,
  Heading,
  theme,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import * as web3 from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

function WalletNotConnected() {
  return (
    <VStack height="70vh" justify="space-around">
      <VStack>
        <Text fontSize="2xl">
          {' '}
          Looks like your wallet is not connnected. Connect a wallet to get
          started!
        </Text>
        <WalletMultiButton />
      </VStack>
    </VStack>
  );
}

function App() {

  const network = "devnet";
  const endpoint = web3.clusterApiUrl(network);
  const wallets = useMemo(
    () => [
      PhantomWalletAdapter(),
      SolflareWalletAdapter(),
      SolletWalletAdapter({ network }),
      SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
}

export default App;