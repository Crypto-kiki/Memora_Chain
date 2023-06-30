import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MyNfts = ({ metadataUris }) => {
  const [images, setImages] = useState([]);
  const [wideImages, setWideImages] = useState([]);
  const [lengthyImages, setLengthyImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const modalRef = useRef(null);

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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleModalClose = () => {
    setSelectedImageIndex(null);
  };

  const handleModalOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  const loadImage = async () => {
    const wide = [];
    const lengthy = [];
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
    setWideImages(wide);
    setLengthyImages(lengthy);
    console.log(wideImages);
    console.log(lengthyImages);
  };

  return (
    <div className="px-10">
      <div className="flex justify-between items-center mb-14">
        <div className="text-2xl font-bold">
          Total Nfts: {metadataUris.length} EA
        </div>
        <button>Delete NFT</button>
      </div>
      <div className="grid grid-cols-4 justify-center gap-10">
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
      <div className="grid grid-cols-2 justify-center gap-y-10 gap-x-10 mt-10">
        {wideImages.map((imageUrl, index) => (
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
          className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-xl flex justify-center items-center"
          onClick={handleModalOutsideClick}
        >
          <div className="flex flex-col items-center" ref={modalRef}>
            <img
              src={images[selectedImageIndex]}
              alt={`NFT ${selectedImageIndex}`}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <button
              className="border border-white px-16 py-4 text-lg mt-10 font-bold"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNfts;
