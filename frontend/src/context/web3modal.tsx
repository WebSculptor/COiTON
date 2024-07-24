"use client";

import { site } from "@/constants";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

export const SEPOLIA_CHAIN_ID: number = 11155111;
export const OPTIMISM_CHAIN_ID: number = 11155420;
export const LISK_CHAIN_ID: number = 4202;
export const ANVIL_CHAIN_ID: number = 31337;
export const AVAX_CHAIN_ID: number = 43113;

// const ethereumSepolia = {
//   chainId: SEPOLIA_CHAIN_ID,
//   name: "Ethereum Sepolia",
//   currency: "ETH",
//   explorerUrl: "https://sepolia.etherscan.io/",
//   rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
//   // websocket: wss://eth-sepolia.g.alchemy.com/v2/
// };

// const opSepoliaChain = {
//   chainId: OPTIMISM_CHAIN_ID,
//   name: "Optimism Sepolia",
//   currency: "ETH",
//   explorerUrl: "https://sepolia-optimism.etherscan.io/",
//   rpcUrl: `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
// };

// const localhost = {
//   chainId: ANVIL_CHAIN_ID,
//   name: "Localhost 8545",
//   currency: "ETH",
//   explorerUrl: "http://127.0.0.1:8545",
//   rpcUrl: "http://127.0.0.1:8545",
// };

// const liskChain = {
//   chainId: LISK_CHAIN_ID,
//   name: "Lisk Sepolia",
//   currency: "ETH",
//   explorerUrl: "https://sepolia-blockscout.lisk.com",
//   rpcUrl: "https://rpc.sepolia-api.lisk.com",
// };

const avaxChain = {
  chainId: AVAX_CHAIN_ID,
  name: "Avalanche Fuji testnet",
  currency: "AVAX",
  explorerUrl: "https://testnet.snowtrace.io",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
};

const metadata = {
  name: site.name,
  description: site.description,
  url: site.url,
  icons: [
    "https://coiton.vercel.app/_next/image?url=%2Fimg%2Flogo.png&w=96&q=100",
  ],
};

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 10,
});

createWeb3Modal({
  ethersConfig,
  chains: [
    // opSepoliaChain,
    avaxChain,
    // liskChain
  ],
  projectId: "0a4f797ca31c020f3cb7579960b64b36",
  enableOnramp: true,
  enableAnalytics: true,
});

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return children;
}
