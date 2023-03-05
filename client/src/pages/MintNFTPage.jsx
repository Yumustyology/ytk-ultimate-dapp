import React, { useContext, useRef, useState } from "react";
import { Navbar } from "../components";
import { TransactionContext } from "../context/TransactionContext";
import "../styles/drop-file-input.css";
import uploadImg from "../assets/imgs/cloud-upload-regular-240.png";
import ImageUploading from "react-images-uploading";
import { create } from "ipfs-http-client";
// import { create as ipfsHttpClient } from 'ipfs-http-client'
// import ipfsClient from 'ipfs-http-client'
import { ytkNFTMarketplaceContractAddress } from "../utils/constants";
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const projectID = "2MbEBaAg9rQvrd1A0QpESsAqpax";
const projectSecret = "aee03581be0f867f3c2a4ccd06c89be8";

const auth =
  "Basic " + Buffer.from(projectID + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Input = ({ placeholder, name, type, value, handleChange, classInput }) =>
  type != "textarea" ? (
    <input
      placeholder={placeholder}
      type={type}
      min={type === "number" && 0}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outilne-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  ) : (
    <textarea
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className={`my-2 w-full rounded-sm p-2 outilne-none bg-transparent text-white border-none text-sm white-glassmorphism ${classInput} `}
    ></textarea>
  );

function MintNFTPage() {
  const {
    connectWallet,
    currentAccount,
    loading,
    ethBal,
    ytkBal,
    currency,
    setCurrency,
    getYtkNftTMarketplaceContract,
    getYtkNftContract,
  } = useContext(TransactionContext);

  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [images, setImages] = React.useState([]);
  const [imageUri, setImageUri] = React.useState("");

  const [mintFormData, setMintFormData] = useState({
    image: "",
    price: 0.001,
    nftName: "bored chicken",
    description: "just testing",
  });

  const handleChange = (e, name) => {
    setMintFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(mintFormData);
  };

  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    mintFormData.image = imageList;
    setImages(imageList);
  };

  const mintNftEther = async (e) => {
    e.preventDefault();
    const file = mintFormData.image[0].file;
    console.log(file);
    let nftMarketplace = getYtkNftTMarketplaceContract();
    let ytkNft = getYtkNftContract();
    if (
      !file ||
      !mintFormData.price ||
      !mintFormData.nftName ||
      !mintFormData.description
    )
      return;

    try {
      console.log("yoyo");

      const result = await client.add(file);
      console.log("result", result);

      setImageUri(`https://ytk-ultimate-dapp.infura-ipfs.io/${result.path}`);

      const uri = `https://ytk-ultimate-dapp.infura-ipfs.io/${result.path}`;

      const ipfsUrl = uri;

      // const ipfsUrl = 'https://ipfs.infura.io:5001/api/v0/cat?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn';

      // fetch(ipfsUrl, {
      //   method: "POST",
      //   mode: 'no-cors',
      //   headers: {
      //     Authorization: `Basic ${btoa(`${projectID}:${projectSecret}`)}`,
      //   },
      // })
      //   .then((response) => response.text())
      //   .then((data) => {
      //     // Handle the response data
      //     console.log("data from img get ", data);
      //   })
      //   .catch((error) => {
      //     // Handle the error
      //     console.log("img get err ", error);
      //   });

      console.log(uri);
      // mint nft
      let minting = await ytkNft.mint(uri);

      console.log("minting ", minting);

      // get tokenId of new nft
      const nextTokenIdResp = await ytkNft.tokenCount();

      let nextTokenId = nextTokenIdResp.toNumber();

      // approve marketplace to spend nft
      let approval = await ytkNft.setApprovalForAll(
        ytkNFTMarketplaceContractAddress,
        true
      );

      console.log("approval ", approval);

      const listingPrice = ethers.utils.parseEther(
        mintFormData.price.toString()
      );

      let minted = await nftMarketplace.mintWithEther(
        ytkNFTMarketplaceContractAddress,
        listingPrice,
        nextTokenId,
        ytkContractAddress,
        "etherMint"
      );

      console.log("minted ", minted);

      // add nft to marketplace
      // const listingPrice = ethers.utils.parseEther(mintFormData.price.toString())
      // await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    } catch (error) {
      console.log("ipfs image upload error: ", error);
    }
  };

  //   if (!currentAccount) return;
  return (
    <div className="min-h-screen flex flex-col  w-full h-max gradient-bg-welcome">
      <Navbar />

      {/* <h1 className="text-white ta-center text-3xl sm:text-5xl py-2 text-gradient">
        MINT NFTs
      </h1> */}

      <div className="p-5 md:w-[90%] lg:w-[50%]  h-screen- m-auto flex flex-col justify-start items-center blue-glassmorphism">
        <Input
          placeholder="Nft Name"
          name="nftName"
          type="text"
          handleChange={handleChange}
          value={mintFormData.nftName}
        />

        <Input
          placeholder="Enter Payment Description or message."
          name="description"
          type="textarea"
          handleChange={handleChange}
          classIn="h-40"
          value={mintFormData.description}
        />

        <Input
          placeholder={`Amount (${currency.toLocaleUpperCase()})`}
          name="price"
          type="number"
          handleChange={handleChange}
          value={mintFormData.price}
        />
        <>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            // acceptType={["jpg,png,jpeg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <>
                <div
                  ref={wrapperRef}
                  className="drop-file-input cursor-pointer"
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() =>
                    imageList.length < 1 ? onImageUpload() : onImageUpdate(0)
                  }
                  {...dragProps}
                >
                  <div className="drop-file-input__label flex justify-center items-center flex-col w-full rounded-sm p-2 outilne-none bg-transparent text-white border-none text-sm white-glassmorphism">
                    <img src={uploadImg} alt="" className="w-[10px]" />
                    <p>Drag & Drop your files here</p>
                  </div>
                </div>
                &nbsp;
                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item -mt-9">
                    <img src={image.data_url} alt="" width="150" />
                    <div className="image-item__btn-wrapper mt-2 mb-1 w-[100%] flex justify-between">
                      <button
                        onClick={() => onImageUpdate(index)}
                        className="bg-[#2952e3] w-[48%] p-2 h-8 text-sm rounded-full cursor-pointer hover:bg-[#2546bd]"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onImageRemove(index)}
                        className="bg-[#db2f2f] w-[48%] p-2 h-8 text-sm rounded-full cursor-pointer hover:bg-[#935050]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </ImageUploading>
        </>

        {/* <input type="file" onChange={mintNftEther} /> */}
        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {loading ? (
          <Loader />
        ) : currentAccount ? (
          <button
            type="button"
            onClick={mintNftEther}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Mint NFT
          </button>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default MintNFTPage;
