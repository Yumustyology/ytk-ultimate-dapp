const hre = require("hardhat");

const main = async () => {
  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log(`contract deployed to ${transactions.address}`);
};

const runDeployment = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runDeployment();

// 0x6024e96413690232277054184C2ED58D2644684F