const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so BallotContract here is a factory for instances of our Ballot contract.
  */
  const BallotContract = await ethers.getContractFactory("Ballot");

  // here we deploy the contract
  const deployedBallotContract = await BallotContract.deploy([""]);


  // Wait for it to finish deploying
  await deployedBallotContract.deployed();

  // print the address of the deployed contract
  console.log("Ballot Contract Address:", deployedBallotContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });