const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so voteContract here is a factory for instances of our vote contract.
  */
  const voteContract = await ethers.getContractFactory("new_vote");

  // here we deploy the contract
  const deployedvoteContract = await voteContract.deploy();


  // Wait for it to finish deploying
  await deployedvoteContract.deployed();

  // print the address of the deployed contract
  console.log("vote Contract Address:", deployedvoteContract.address);
 // console.log(msg.sender)
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });