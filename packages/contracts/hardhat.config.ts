import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Ensure environment variables are read properly
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

// Configuration for Hardhat
const config: HardhatUserConfig = {
  // Configure supported Solidity versions
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  // Network configurations
  networks: {
    // Local development network
    hardhat: {
      chainId: 31337,
    },

    // Ethereum mainnet
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 1,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },

    // Sepolia testnet
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      chainId: 11155111,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
  },

  // Contract verification settings
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
    },
  },

  // // Testing configuration
  // mocha: {
  //   timeout: 40000, // 40 seconds max for running tests
  // },

  // // Gas reporting configuration
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  //   excludeContracts: [],
  //   src: "./contracts",
  // },
};

export default config;