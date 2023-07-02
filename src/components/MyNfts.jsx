import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AccountContext } from "../AccountContext";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Web3 from "web3";

const MyNfts = ({ metadataUris, tokenIds, tokenIdsWithMetadataUris }) => {
  const { account, setAccount } = useContext(AccountContext);

  const [images, setImages] = useState([]);
  const [wideImages, setWideImages] = useState([]);
  const [lengthyImages, setLengthyImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedWideImageIndex, setSelectedWideImageIndex] = useState(null);
  const [metadataByTokenIdLengthy, setMetadataByTokenIdLengthy] = useState("");
  const [metadataByTokenIdWide, setMetadataByTokenIdWide] = useState("");
  const [selectedBurn, setSelectedBurn] = useState();
  const [burnTx, setBurnTx] = useState();
  const [selectedImageInfo, setSelectedImageInfo] = useState([]);
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
    setSelectedImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdLengthy(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
      setSelectedBurn(tokenId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setSelectedImageIndex(null);
    setMetadataByTokenIdLengthy("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
  };

  const handleModalOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      handleModalClose();
      setMetadataByTokenIdLengthy("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
    }
  };

  // 가로 이미지
  const handleWideImageClick = async (index) => {
    const imageUrl = wideImages[index];
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedWideImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdWide(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
      setSelectedBurn(tokenId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWideModalClose = () => {
    setSelectedWideImageIndex(null);
    setMetadataByTokenIdWide("");
    setSelectedImageInfo(null);
    setSelectedBurn("");
  };

  const handleWideModalOutsideClick = (event) => {
    if (!modalRef2.current.contains(event.target)) {
      handleWideModalClose();
      setMetadataByTokenIdWide("");
      setSelectedImageInfo(null);
      setSelectedBurn("");
    }
  };

  const onClickBurn = async () => {
    try {
      const tokenId = selectedBurn ? tokenIds[selectedBurn] : null;
      if (tokenId) {
        const response = await contract.methods
          .burnNft(tokenId)
          .send({ from: account });
        setBurnTx(response.transactionHash);
        await handleModalClose();
        await handleWideModalClose();
        console.log(burnTx);
        // await getMetadataImages();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-40">
      <div className="flex justify-between items-center mb-14">
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
            className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-xl flex flex-col justify-center items-center modal ${
              selectedImageIndex !== null ? "" : "hidden"
            }`}
            onClick={handleModalOutsideClick}
          >
            <div className="flex justify-evenly" ref={modalRef}>
              <div className="flex flex-col items-center">
                <img
                  src={lengthyImages[selectedImageIndex]}
                  alt={`NFT ${selectedImageIndex}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <button
                  onClick={onClickBurn}
                  className="bg-white text-[red] px-16 py-4 text-lg mt-10 font-bold "
                >
                  Burn NFT
                </button>
              </div>
              <div className="flex flex-col justify-between items-center">
                {selectedImageInfo && selectedImageInfo.length > 0 && (
                  <>
                    <div className="ml-10 bg-white text-[#20457A] flex flex-col p-8 text-lg h-full">
                      <div>Latitude: {selectedImageInfo[0]?.value}</div>
                      <div>Longitude: {selectedImageInfo[1]?.value}</div>
                      <div className="mt-10">
                        Country: {selectedImageInfo[2]?.value}
                      </div>
                      <div>City: {selectedImageInfo[3]?.value}</div>
                      <div className="mt-10">
                        Address: {selectedImageInfo[4]?.value}
                      </div>
                      <div className="mt-10">
                        Weather: {selectedImageInfo[5]?.value}
                      </div>
                      <div>Temperature: {selectedImageInfo[6]?.value}</div>
                      <div className="mt-10">
                        Message: {selectedImageInfo[7]?.value}
                      </div>
                    </div>
                    <div>
                      <button
                        className="bg-white text-[#20457A] px-16 py-4 text-lg mt-10 font-bold"
                        onClick={handleModalClose}
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-14">
        <div className="grid grid-cols-2 justify-center gap-40 mt-40">
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
            className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-xl flex flex-col justify-center items-center modal ${
              selectedWideImageIndex !== null ? "" : "hidden"
            }`}
            onClick={handleWideModalOutsideClick}
          >
            <div className="flex justify-evenly" ref={modalRef2}>
              <div className="flex flex-col items-center">
                <img
                  src={wideImages[selectedWideImageIndex]}
                  alt={`NFT ${selectedWideImageIndex}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <button
                  onClick={onClickBurn}
                  className="bg-white text-[red] px-16 py-4 text-lg mt-10 font-bold "
                >
                  Burn NFT
                </button>
              </div>
              <div className="flex flex-col justify-between items-center">
                {selectedImageInfo && selectedImageInfo.length > 0 && (
                  <>
                    <div className="ml-10 bg-white text-[#20457A] flex flex-col p-8 text-lg h-full">
                      <div>Latitude: {selectedImageInfo[0]?.value}</div>
                      <div>Longitude: {selectedImageInfo[1]?.value}</div>
                      <div className="mt-10">
                        Country: {selectedImageInfo[2]?.value}
                      </div>
                      <div>City: {selectedImageInfo[3]?.value}</div>
                      <div className="mt-10">
                        Address: {selectedImageInfo[4]?.value}
                      </div>
                      <div className="mt-10">
                        Weather: {selectedImageInfo[5]?.value}
                      </div>
                      <div>Temperature: {selectedImageInfo[6]?.value}</div>
                      <div className="mt-10">
                        Message: {selectedImageInfo[7]?.value}
                      </div>
                    </div>
                    <div>
                      <button
                        className="bg-white text-[#20457A] px-16 py-4 text-lg mt-10 font-bold"
                        onClick={handleWideModalClose}
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNfts;
