const hre = require("hardhat");

const main = async () => {
  // YTKNFTDeployment
    const name = "YTK NFT";
  const symbol = "YTK_NFT";
  const tokenAddress = "0xc44fD6BAB539675A998A95A8389F571F3d909A82"; 

  const YtkNft = await ethers.getContractFactory("YtkNft");
  const ytkNft = await YtkNft.deploy(name, symbol, tokenAddress);


  await ytkNft.deployed();

  console.log(`exchange contract deployed to ${ytkNft.address}`);
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

// 0x601cc448fe50D55A88960628294Fc069D6c9E449

