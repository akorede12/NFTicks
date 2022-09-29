const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const nfticks = await hre.ethers.getContractFactory("NFTick");
  const nftick = await nfticks.deploy();
  await nftick.deployed();
  console.log("nftick deployed to:", nftick.address);

  fs.writeFileSync('./config.js', `
  export const nftickAddress = "${nftick.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
