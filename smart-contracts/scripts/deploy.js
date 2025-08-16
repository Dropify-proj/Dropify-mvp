const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  const DropToken = await ethers.getContractFactory("DropToken");
  const dropToken = await DropToken.deploy();
  await dropToken.deployed();

  console.log("✅ DropToken contract deployed to:", dropToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});