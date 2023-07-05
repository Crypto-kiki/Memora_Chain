import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AccountContext } from "../AccountContext";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";
import { VscChromeClose } from "react-icons/vsc";
import { getStorage, ref, deleteObject } from "firebase/storage";

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
  const [selectedImageInfo, setSelectedImageInfo] = useState([]);
  const [selectedBurn, setSelectedBurn] = useState();

  const [metadataFileName, setMetadataFileName] = useState(null);
  const [burnTx, setBurnTx] = useState();
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

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
  };

  // 세로 이미지
  const handleImageClick = async (index) => {
    const imageUrl = lengthyImages[index];
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedBurn(tokenId);
    setSelectedImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdLengthy(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
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
    }
  }, [metadataFileName]);

  const handleModalClose = () => {
    setSelectedImageIndex(null);
    setMetadataByTokenIdLengthy("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
    setMetadataFileName("");
    // setBurnTx(null);
  };

  const handleModalOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      handleModalClose();
      setMetadataByTokenIdLengthy("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
      setMetadataFileName("");
    }
  };

  // 가로 이미지
  const handleWideImageClick = async (index) => {
    const imageUrl = wideImages[index];
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedBurn(tokenId);
    setSelectedWideImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdWide(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
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
    setSelectedWideImageIndex(null);
    setMetadataByTokenIdWide("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
    setMetadataFileName("");
    // setBurnTx(null);
  };

  const handleWideModalOutsideClick = (event) => {
    if (!modalRef2.current.contains(event.target)) {
      handleWideModalClose();
      setMetadataByTokenIdWide("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
      setMetadataFileName("");
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

  return (
    <div className="px-40">
      <div className="flex justify-between items-center mb-14 ">
        <div className="text-2xl font-bold">
          My Total Nfts: {metadataUris.length} EA
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 justify-center gap-40">
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
          <div
            className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center modal ${
              selectedImageIndex !== null ? "" : "hidden"
            }`}
            onClick={handleModalOutsideClick}
          >
            <div className="flex justify-evenly" ref={modalRef}>
              <div className="flex items-center">
                <img
                  src={lengthyImages[selectedImageIndex]}
                  alt={`NFT ${selectedImageIndex}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="flex flex-col justify-end items-center">
                <div className="flex flex-col justify-center items-center ml-10">
                  {selectedImageInfo && selectedImageInfo.length > 0 && (
                    <div className="flex flex-col text-xl p-20 modalLetter w-[700px] relative">
                      <VscChromeClose
                        onClick={handleModalClose}
                        className=" text-[#f3f2dc] text-3xl font-extrabold absolute right-5 top-0 border rounded-full border-[#f3f2dc]"
                      />
                      <div className="flex justify-center mb-14 text-3xl font-bold tracking-widest">
                        INFO
                      </div>
                      <div className="pl-10">
                        Latitude: {selectedImageInfo[0]?.value}
                      </div>
                      <div className="pl-10">
                        Longitude: {selectedImageInfo[1]?.value}
                      </div>
                      <div className="mt-6 pl-10">
                        Country: {selectedImageInfo[2]?.value}
                      </div>
                      <div className="pl-10">
                        City: {selectedImageInfo[3]?.value.toLowerCase()}
                      </div>
                      <div className="mt-6 pl-10">
                        Address
                        <div>{selectedImageInfo[4]?.value}</div>
                      </div>
                      <div className="mt-6 pl-10">
                        Weather: {selectedImageInfo[5]?.value}
                      </div>
                      <div className="pl-10">
                        Temperature: {selectedImageInfo[6]?.value}
                      </div>
                      <div className="mt-6 pl-10">
                        Message:
                        <div className="break-words">
                          {selectedImageInfo[7]?.value}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={onClickBurn}
                    className="border-4 border-[#f3f2dc] px-20 py-4 font-extrabold text-xl tracking-widest"
                  >
                    Burn NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-40">
        <div className="grid grid-cols-2 justify-center gap-40">
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
            className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center modal ${
              selectedWideImageIndex !== null ? "" : "hidden"
            }`}
            onClick={handleWideModalOutsideClick}
          >
            <div className="flex justify-evenly" ref={modalRef2}>
              <div className="flex items-center">
                <img
                  src={wideImages[selectedWideImageIndex]}
                  alt={`NFT ${selectedWideImageIndex}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="flex flex-col justify-end items-center">
                <div className="flex flex-col justify-center items-center ml-10">
                  {selectedImageInfo && selectedImageInfo.length > 0 && (
                    <div className="flex flex-col text-xl p-20 modalLetter w-[700px] relative">
                      <VscChromeClose
                        onClick={handleWideModalClose}
                        className=" text-[#f3f2dc] text-3xl font-extrabold absolute right-5 top-0 border rounded-full border-[#f3f2dc]"
                      />
                      <div className="flex justify-center mb-14 text-3xl font-bold tracking-widest">
                        INFO
                      </div>
                      <div className="pl-10">
                        Latitude: {selectedImageInfo[0]?.value}
                      </div>
                      <div className="pl-10">
                        Longitude: {selectedImageInfo[1]?.value}
                      </div>
                      <div className="mt-6 pl-10">
                        Country: {selectedImageInfo[2]?.value}
                      </div>
                      <div className="pl-10">
                        City: {selectedImageInfo[3]?.value.toLowerCase()}
                      </div>
                      <div className="mt-6 pl-10">
                        Address
                        <div>{selectedImageInfo[4]?.value}</div>
                      </div>
                      <div className="mt-6 pl-10">
                        Weather: {selectedImageInfo[5]?.value}
                      </div>
                      <div className="pl-10">
                        Temperature: {selectedImageInfo[6]?.value}
                      </div>
                      <div className="mt-6 pl-10">
                        Message:
                        <div className="break-words">
                          {selectedImageInfo[7]?.value}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={onClickBurn}
                    className="border-4 border-[#f3f2dc] px-20 py-4 font-extrabold text-xl tracking-widest"
                  >
                    Burn NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNfts;
