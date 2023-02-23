const hre = require("hardhat");

const main = async () => {
   const Transactions = await hre.ethers.getContractFactory("yungToken");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log(`ytk contract deployed to ${transactions.address}`);
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

// 0xc44fD6BAB539675A998A95A8389F571F3d909A82