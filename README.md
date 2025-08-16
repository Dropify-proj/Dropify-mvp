[README.Md](https://github.com/user-attachments/files/21806684/README.Md)
Dropify MVP 💧
A modern Web3 rewards platform that turns everyday actions into digital assets. This project allows users to sign up with a Web3 wallet, upload receipts, and earn cryptocurrency ($DROP tokens) as a reward.

About The Project
Dropify serves as a proof-of-concept for a new generation of customer loyalty programs. It bridges the gap between Web2 familiarity and Web3 ownership by providing a seamless user experience built on a robust, scalable architecture.

The project is structured into three distinct parts:

Smart Contracts: A secure ERC20 token contract written in Solidity and deployed using Hardhat.

Backend Server: A Node.js and Express server that handles receipt uploads and securely mints new tokens by calling the smart contract.

Frontend dApp: A modern user interface built with React and TypeScript, allowing users to connect their wallets and interact with the platform.

Key Features
Modern Tech Stack: Built with React, TypeScript, and the official supra-l1-sdk for a scalable and maintainable frontend.

Secure Backend: A dedicated server handles sensitive operations, using a secure wallet to mint tokens and keeping the smart contract owner key off the frontend.

Simple User Experience: Users connect their StarKey wallet and can immediately start earning rewards by uploading receipts.

On-Chain Rewards: $DROP tokens are real, on-chain assets that users truly own.

Getting Started
To get a local copy of this project up and running, follow these steps.

Prerequisites
Node.js (LTS version): https://nodejs.org/

Supra StarKey Wallet: The official browser extension wallet for the Supra network.

Deployment & Installation
This project is split into three parts, each with its own installation process.

1. Deploy the Smart Contract

Navigate to the /smart-contracts directory: cd smart-contracts

Create a .env file with your PRIVATE_KEY and RPC_URL.

Install dependencies: npm install

Deploy the contract to the Supra testnet: npx hardhat run scripts/deploy.js --network supra

Important: Copy the deployed DropToken contract address.

2. Run the Backend Server

Navigate to the /server directory: cd ../server

Create a .env file. It needs your PRIVATE_KEY, RPC_URL, and the DROP_TOKEN_ADDRESS you just copied.

Install dependencies: npm install

Start the server: node server.js

The server will be running on http://localhost:3001.

3. Run the Frontend Application

Open a new terminal window.

Navigate to the root project directory: cd dropify-mvp

Open the src/App.tsx file and paste the deployed DROP_TOKEN_ADDRESS into the placeholder variable.

Install dependencies: npm install

Start the application: npm start

Your dApp will open in your browser at http://localhost:3000
