import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AccountContext } from "../AccountContext";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";
import { VscChromeClose } from "react-icons/vsc";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyNfts = ({
  metadataUris,
  tokenIds,
  tokenIdsWithMetadataUris,
  onBurnTx,
}) => {
  const { account, setAccount } = useContext(AccountContext);

  const [images, setImages] = useState([]);
  const [wideImages, setWideImages] = useState([]);
  const [lengthyImages, setLengthyImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedWideImageIndex, setSelectedWideImageIndex] = useState(null);
  const [metadataByTokenIdLengthy, setMetadataByTokenIdLengthy] = useState("");
  const [metadataByTokenIdWide, setMetadataByTokenIdWide] = useState("");
  const [selectedBurn, setSelectedBurn] = useState();
  const [selectedImageInfo, setSelectedImageInfo] = useState([]);
  const [partsNumber, setPartsNumber] = useState();

  const [metadataFileName, setMetadataFileName] = useState(null);
  const [burnTx, setBurnTx] = useState();
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const [modalt, setmodalt] = useState(true);

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const connectWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) {
        setAccount(accounts[0]);
      }
      if (parseInt(window.ethereum.networkVersion) !== 11155111) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
      alert("계정 정보를 불러오는데 실패하였습니다.");
    }
  };

  const getMetadataImages = async () => {
    try {
      const imageResponses = await Promise.all(
        metadataUris.map((uri) => axios.get(uri))
      );
      const imageUrls = imageResponses.map((response) => response.data.image);
      setImages(imageUrls);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadataImages();
  }, [metadataUris]);

  useEffect(() => {
    if (images.length > 0) {
      loadImage();
    }
  }, [images]);

  const loadImage = async () => {
    const lengthy = [];
    const wide = [];

    try {
      await Promise.all(
        images.map((imageUrl) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
              const iw = image.width;
              const ih = image.height;
              if (iw > ih) {
                wide.push(imageUrl);
              } else {
                lengthy.push(imageUrl);
              }
              resolve();
            };
          });
        })
      );
    } catch (error) {
      console.error(error);
    }
    setLengthyImages(lengthy);
    setWideImages(wide);
    setLoading(false);
  };

  // 세로 이미지
  const handleImageClick = async (index) => {
    const imageUrl = lengthyImages[index];
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedBurn(tokenId);
    setSelectedImageIndex(index);
    setmodalt(true);

    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdLengthy(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
      setPartsNumber(metadata.attributes[9].value);
      const uploadedFileNameAttribute = metadata.attributes.find(
        (attribute) => attribute.trait_type === "Uploaded File Name"
      );
      if (uploadedFileNameAttribute) {
        setMetadataFileName(uploadedFileNameAttribute.value);
      } else {
        setMetadataFileName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (metadataFileName !== null) {
      console.log(metadataFileName);
      console.log(selectedImageInfo);
    }
  }, [metadataFileName]);

  const handleModalClose = () => {
    setmodalt(false);
    setSelectedImageIndex(null);
    setMetadataByTokenIdLengthy("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
    setMetadataFileName("");
    setPartsNumber("");
  };

  const handleModalOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      setmodalt(false);
      handleModalClose();
      setMetadataByTokenIdLengthy("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
      setMetadataFileName("");
      setPartsNumber("");
    }
  };

  // 가로 이미지
  const handleWideImageClick = async (index) => {
    const imageUrl = wideImages[index];
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedBurn(tokenId);
    setSelectedWideImageIndex(index);
    setmodalt(true);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdWide(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
      setPartsNumber(metadata.attributes[9].value);
      const uploadedFileNameAttribute = metadata.attributes.find(
        (attribute) => attribute.trait_type === "Uploaded File Name"
      );
      if (uploadedFileNameAttribute) {
        setMetadataFileName(uploadedFileNameAttribute.value);
      } else {
        setMetadataFileName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWideModalClose = () => {
    setmodalt(false);
    setSelectedWideImageIndex(null);
    setMetadataByTokenIdWide("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
    setMetadataFileName("");
    setPartsNumber("");
    // setBurnTx(null);
  };

  const handleWideModalOutsideClick = (event) => {
    if (!modalRef2.current.contains(event.target)) {
      setmodalt(false);
      handleWideModalClose();
      setMetadataByTokenIdWide("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
      setMetadataFileName("");
      setPartsNumber("");
    }
  };

  const onClickBurn = async () => {
    try {
      const tokenId = selectedBurn;
      if (tokenId) {
        const response = await contract.methods
          .burnNft(tokenId)
          .send({ from: account });
        console.log(response);

        const storage = getStorage();
        const desertRef = ref(storage, account + "/" + metadataFileName);
        await deleteObject(desertRef);

        const txHash = response.transactionHash;
        onBurnTx(txHash); // 부모 컴포넌트로 burnTx 값 전달

        // setBurnTx(txHash);
        handleModalClose();
        handleWideModalClose();
        console.log(burnTx);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const restoreNft = async () => {
  //   if (partsNumber == "none") {
  //     alert("메타데이터를 업로드해야 합니다.");
  //     return;
  //   }
  //   try {
  //     const mintNft = await contract.methods
  //       .restoreNft(selectedBurn)
  //       .send({ from: account });
  //     console.log(mintNft);
  //     const txHash = mintNft.transactionHash;
  //     onBurnTx(txHash); // 부모 컴포넌트로 burnTx 값 전달
  //     handleModalClose();
  //     handleWideModalClose();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [detach, setDetach] = useState(false);

  const restoreNft = async () => {
    setDetach(true);
    try {
      const response = await contract.methods
        .restoreNft(selectedBurn)
        .send({ from: account });
      console.log(response);

      console.log(metadataFileName);
      const storage = getStorage();
      const desertRef = ref(storage, account + "/" + metadataFileName);
      console.log(desertRef);
      await deleteObject(desertRef);

      const txHash = response.transactionHash;
      onBurnTx(txHash);
      setDetach(false);
      handleModalClose();
      handleWideModalClose();
    } catch (error) {
      setDetach(false);
      console.error(error);
    }
  };

  return (
    <div className="px-10 md:px-40">
      <div className="flex justify-between items-center mb-4 md:mb-14">
        <div className="text-lg md:text-2xl font-semibold md:font-bold tracking-wider">
          My Total Nfts: {metadataUris.length} EA
        </div>
      </div>
      {metadataUris.length != 0 && (
        <div>
          {!loading ? (
            <>
              <div>
                <div className="grid grid-cols-3 justify-center gap-5 md:gap-32">
                  {lengthyImages.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        src={imageUrl}
                        alt={`NFT ${index}`}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  ))}
                </div>
                {selectedImageIndex !== null && (
                  <motion.div
                    className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center"
                    onClick={handleModalOutsideClick}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                  >
                    <div
                      className="grid grid-row-2 md:flex  p-4 md:p-0 justify-center items-center md:flex-row md:justify-evenly md:items-center overflow-scroll md:overflow-auto"
                      ref={modalRef}
                    >
                      <div className="flex p-4 justify-center items-start md:items-center md:justify-center">
                        <img
                          src={lengthyImages[selectedImageIndex]}
                          alt={`NFT ${selectedImageIndex}`}
                          className=" h-full  md:h-1/2 md:w-5/6"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex  flex-col  justify-center items-center  md:ml-10">
                          {selectedImageInfo &&
                            selectedImageInfo.length > 0 && (
                              <div className="flex flex-col  text-xs md:text-xl pr-16 py-8 md:p-20 modalLetter w-[375px]   md:w-[700px] relative">
                                <button onClick={handleModalClose}>
                                  <VscChromeClose className=" text-[#f3f2dc] text-xl md:text-3xl font-extrabold absolute right-5 top-0 border rounded-full border-[#f3f2dc]" />
                                </button>
                                <div className="flex justify-center pl-16  mb-3 md:mb-14 text-xl md:text-3xl font-bold  tracking-widest">
                                  INFO
                                </div>
                                <div className="pl-16 md:pl-10">
                                  Latitude: {selectedImageInfo[0]?.value}
                                </div>
                                <div className="pl-16 md:pl-10">
                                  Longitude: {selectedImageInfo[1]?.value}
                                </div>
                                <div className="mt-3 md:mt-6 pl-16 md:pl-10">
                                  Country: {selectedImageInfo[2]?.value}
                                </div>
                                <div className="pl-16 md:pl-10">
                                  City:{" "}
                                  {selectedImageInfo[3]?.value.toLowerCase()}
                                </div>
                                <div className="mt-3 md:mt-6 pl-16 md:pl-10">
                                  Address
                                  <div>{selectedImageInfo[4]?.value}</div>
                                </div>
                                <div className="mt-3 md:mt-6 pl-16 md:pl-10">
                                  Weather: {selectedImageInfo[5]?.value}
                                </div>
                                <div className="pl-16 md:pl-10">
                                  Temperature: {selectedImageInfo[6]?.value}
                                </div>
                                <div className="mt-3 md:mt-6 pl-16 md:pl-10 break-words">
                                  Message:
                                  <div className="">
                                    {selectedImageInfo[7]?.value}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        <div>
                          {partsNumber == "none" ? (
                            <button
                              onClick={onClickBurn}
                              className="mt-2 md:mt-0 border-[1px]  border-[#f3f2dc] px-10 md:px-20 py-2 md:py-4 font-normal md:font-extrabold text-xl tracking-widest"
                            >
                              Burn NFT
                            </button>
                          ) : (
                            <div className="w-full flex justify-end items-end">
                              <button
                                onClick={onClickBurn}
                                className="mt-2 md:mt-0 border-[1px] border-[#f3f2dc] px-10 md:px-20 py-2 md:py-4 font-normal md:font-extrabold text-xl tracking-widest"
                              >
                                Burn NFT
                              </button>
                              {detach == true ? (
                                <motion.div
                                  className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center  z-20`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 2, ease: "easeIn" }}
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/image/myPage/detachGIF.gif`}
                                  />
                                </motion.div>
                              ) : (
                                <button
                                  onClick={restoreNft}
                                  className="mt-2 md:mt-0 border-[1px] border-[#f3f2dc] px-10 md:px-10 py-2 md:py-4 font-normal md:font-extrabold text-xl tracking-widest"
                                >
                                  Detach Sticker
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="mt-10 md:mt-32">
                <div className="grid grid-cols-2 justify-center gap-5 md:gap-32">
                  {wideImages.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        src={imageUrl}
                        alt={`NFT ${index}`}
                        onClick={() => handleWideImageClick(index)}
                      />
                    </div>
                  ))}
                </div>
                {selectedWideImageIndex !== null && (
                  <div
                    className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center "
                    onClick={handleWideModalOutsideClick}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                  >
                    <div
                      className="grid gird-rows-2 md:flex md:justify-evenly"
                      ref={modalRef2}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={wideImages[selectedWideImageIndex]}
                          alt={`NFT ${selectedWideImageIndex}`}
                          className="w-full md:h-5/6 md:max-w-full"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center md:ml-10">
                          {selectedImageInfo &&
                            selectedImageInfo.length > 0 && (
                              <div className="flex flex-col text-xs md:text-xl p-8 md:p-20 modalLetter w-[370px] md:w-[700px] relative ">
                                <button onClick={handleWideModalClose}>
                                  <VscChromeClose className=" text-[#f3f2dc] text-xl md:text-3xl font-extrabold absolute right-5 top-0 border rounded-full border-[#f3f2dc]" />
                                </button>
                                <div className="flex justify-center pl-6 mb-3 md:mb-14 text-xl md:text-3xl font-bold tracking-widest">
                                  INFO
                                </div>
                                <div className="pl-8 md:pl-10">
                                  Latitude: {selectedImageInfo[0]?.value}
                                </div>
                                <div className="pl-8 md:pl-10">
                                  Longitude: {selectedImageInfo[1]?.value}
                                </div>
                                <div className="mt-3 md:mt-6 pl-8 md:pl-10">
                                  Country: {selectedImageInfo[2]?.value}
                                </div>
                                <div className="pl-8 md:pl-10">
                                  City:{" "}
                                  {selectedImageInfo[3]?.value.toLowerCase()}
                                </div>
                                <div className="mt-3 md:mt-6 pl-8 md:pl-10">
                                  Address
                                  <div>{selectedImageInfo[4]?.value}</div>
                                </div>
                                <div className="mt-3 md:mt-6 pl-8 md:pl-10">
                                  Weather: {selectedImageInfo[5]?.value}
                                </div>
                                <div className="pl-8 md:pl-10">
                                  Temperature: {selectedImageInfo[6]?.value}
                                </div>
                                <div className="mt-3 md:mt-6 pl-8 md:pl-10">
                                  Message:
                                  <div className="break-words">
                                    {selectedImageInfo[7]?.value}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                        <div>
                          {partsNumber == "none" ? (
                            <button
                              onClick={onClickBurn}
                              className="mt-2 md:mt-0 border-4 border-[#f3f2dc] px-10 md:px-20 py-2 md:py-4 font-extrabold text-xl tracking-widest"
                            >
                              Burn NFT
                            </button>
                          ) : (
                            <div className="w-full flex justify-end items-end">
                              <button
                                onClick={onClickBurn}
                                className="mt-2 md:mt-0 border-4 border-[#f3f2dc] px-10 md:px-20 py-2 md:py-4 font-extrabold text-xl tracking-widest"
                              >
                                Burn NFT
                              </button>
                              {detach == true ? (
                                <motion.div
                                  className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center  z-20`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 2, ease: "easeIn" }}
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/image/myPage/detachGIF.gif`}
                                  />
                                </motion.div>
                              ) : (
                                <button
                                  onClick={restoreNft}
                                  className="mt-2 md:mt-0 border-[1px] border-[#f3f2dc] px-10 md:px-10 py-2 md:py-4 font-normal md:font-extrabold text-xl tracking-widest"
                                >
                                  Detach Sticker
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-screen  border-4 flex justify-center items-center font-[#f3f2dc]">
              <div className="flex justify-center items-center text-2xl md:text-4xl">
                Loading Image
              </div>
            </div>
          )}
        </div>
      )}
      {account ? (
        <div>
          {metadataUris.length == 0 && (
            <div className="w-full h-screen  border-4 flex flex-col justify-center items-center ">
              <div className="flex justify-center items-center text-2xl md:text-4xl">
                You don't have any NFTs in your Wallet
              </div>
              <div>
                <Link to="/mint">
                  <div className="border-2 p-2 md:p-4 text-xl  md:text-2xl mt-3 md:mt-6 rounded-md hover:bg-[#f3f2dc] hover:text-gray-700  ">
                    Mint Now
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-screen  border-4 flex flex-col justify-center items-center ">
          <div className="flex justify-center items-center text-2xl md:text-4xl">
            Please log in first
          </div>
          <div>
            <button
              className="border-2 p-2 md:p-4 text-xl  md:text-2xl mt-3 md:mt-6 rounded-md hover:bg-[#f3f2dc] hover:text-gray-700 "
              onClick={connectWithMetamask}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNfts;
