const hre = require("hardhat");

const main = async () => {
  // YTKNFTMarketplaceDeployment
   
  const feePercent = 6; 
 const ytkNFTContractAddress = '0x9183DB55C15F31079b4AdA5584abD708Ee923A68'
  const tokenAddress = "0xc44fD6BAB539675A998A95A8389F571F3d909A82"; 
    
  const YtkNftMarketPlace = await ethers.getContractFactory("YtkNftMarketplace");
  const ytkNftMarketPlace = await YtkNftMarketPlace.deploy(feePercent, ytkNFTContractAddress,tokenAddress);


  await ytkNftMarketPlace.deployed();

  console.log(`exchange contract deployed to ${ytkNftMarketPlace.address}`);
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

