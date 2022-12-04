const { ethers } = require("hardhat");

async function main() {
  // Calling the contracts
const Zoe = await ethers.getContractFactory("Zoe");

// Deploy the contract
const zoe = await Zoe.deploy()

await zoe.deployed()


// print the contract address
console.log("Zoe Bank deployed to: ", zoe.address);



  console.log("Sleeping.....");
  // Wait for polygonscan to notice that the contract has been deployed
  await sleep(10000);

  // Verify the Zoe Bank  contract after deploying
  await hre.run("verify:verify", {
    contract: "contracts/Zoe.sol:Zoe",
    address: zoe.address,
    constructorArguments: [],
  });

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
