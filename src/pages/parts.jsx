import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import { useCallback, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  updateMetadata,
} from "firebase/storage";
import FileUpload from "../components/FileUpload";
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import ItemCanvas from "../components/ItemCanvas/ItemCanvas";

const Parts = () => {
  // const { account, setAccount } = useContext(AccountContext); // Context에서 account 값과 setAccount 함수 가져오기
  const { account, setAccount } = useContext(AccountContext);

  const [ItemIndex, setItemIndex] = useState();
  const modalRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 정보 저장
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdsWithMetadataUris, setTokenIdsWithMetadataUris] = useState({});
  const [metadataUris, setMetadataURIs] = useState([]);
  const [images, setImages] = useState([]);
  const [wideImages, setWideImages] = useState([]);
  const [lengthyImages, setLengthyImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedWideImageIndex, setSelectedWideImageIndex] = useState(null);
  const [metadataByTokenIdLengthy, setMetadataByTokenIdLengthy] = useState("");
  const [metadataByTokenIdWide, setMetadataByTokenIdWide] = useState("");
  const [selectedImageInfo, setSelectedImageInfo] = useState([]);

  const ItemImage = [
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/tape.jpg`,
      name: "Tape",
      position: "우측 상단",
      price: "0.001",
    },
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/stamp.jpg`,
      name: "stamp",
      position: "우측 상단",
      price: "0.002",
    },
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/umbrella.png`,
      name: "Umbrella",
      position: "우측 상단",
      price: "0.003",
    },
  ];

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const connectWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      alert("계정 정보를 불러오는데 실패하였습니다.");
    }
  };

  const onClickLogOut = () => {
    setAccount("");
  };

  useEffect(() => {
    console.log("itemIdex :" + ItemIndex);
  }, [ItemIndex]);

  const getMyNfts = async () => {
    try {
      const response = await contract.methods.getAllNft(account).call();
      const tempArray = response.map((v) => Number(v));
      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNfts();
  }, [ItemIndex]);

  const getTokenUris = async () => {
    try {
      const uris = {};
      const token = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const metadataUri = await contract.methods
          .metadataUri(tokenIds[i])
          .call();
        const response = await axios.get(metadataUri); // URI를 사용하여 이미지 데이터를 가져옴
        const imageUrl = response.data.image;
        uris[imageUrl] = tokenIds[i];
        token.push(tokenIds[i]);
      }
      setTokenIdsWithMetadataUris(uris);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tokenIds.length > 0) {
      getTokenUris();
    }
  }, [tokenIds]);

  const getTokenUrisForImage = async () => {
    try {
      const uris = [];
      const token = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const response = await contract.methods.metadataUri(tokenIds[i]).call();
        uris.push(response);
        token.push(tokenIds[i]);
      }
      setMetadataURIs(uris);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTokenUrisForImage();
  }, [tokenIdsWithMetadataUris]);

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
    setSelectedNFTImage(imageUrl);
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdLengthy(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
    } catch (error) {
      console.error(error);
    }
  };

  // 가로 이미지
  const handleWideImageClick = async (index) => {
    const imageUrl = wideImages[index];
    setSelectedNFTImage(imageUrl);
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    console.log(`Selected image tokenId: ${tokenId}`);
    setSelectedWideImageIndex(index);
    try {
      const response = await contract.methods.tokenURI(tokenId).call();
      setMetadataByTokenIdWide(response);
      const metadataResponse = await fetch(response);
      const metadata = await metadataResponse.json();
      setSelectedImageInfo(metadata.attributes);
    } catch (error) {
      console.error(error);
    }
  };

  // 아이템 모달
  const openItemModal = (index) => {
    setItemIndex(index);
    setModalIsOpen(true);
  };
  const closeItemModal = () => {
    setModalIsOpen(false);
  };

  // Canvas
  const [size, setSize] = useState([]);
  const [end, setEnd] = useState(false);
  const [selectedNFTImage, setSelectedNFTImage] = useState();

  const loadImageForCanvas = useCallback(() => {
    const image = new Image();

    image.src = selectedNFTImage;

    image.onload = () => {
      const iw = image.width;
      const ih = image.height;
      if (iw / ih > 1.1) {
        // 가로가 김
        setSize([1, ...size]);
        setEnd(true);
      } else if (iw / ih < 0.9) {
        // 세로가 김
        setSize([2, ...size]);
        setEnd(true);
      }
    };
  }, [selectedNFTImage, size]);

  useEffect(() => {
    if (selectedNFTImage) {
      setEnd(false);
    }
  }, [selectedNFTImage]);

  useEffect(() => {
    if (end) {
      loadImageForCanvas();
      console.log(size);
    }
  }, [end, loadImageForCanvas]);

  useEffect(() => {
    if (size.length > 2 && size[0] === 1) {
      setSize([1]);
    }
    console.log(size);
  }, [size]);

  useEffect(() => {
    console.log(end);
  }, [end]);

  return (
    <div className="flex justify-between min-h-screen partsmobileBackground partsBackground">
      {/* <div className="film-left w-24" /> */}
      <div className="w-full flex flex-col">
        <header className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider text-[#686667]">
          <Link to="/">
            <div className="mt-6">
              <img
                src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                className="w-28 "
              />
            </div>
          </Link>
          <div className="flex">
            <Link to="/mint">
              <div>Mint</div>
            </Link>
            <Link to="/partsshop">
              <div className="mx-10 font-bold">Parts Shop</div>
            </Link>
            <Link
              to={account ? "/mypage" : ""}
              onClick={!account ? connectWithMetamask : null}
            >
              {account ? <div>MyPage</div> : <div>Login</div>}
            </Link>
          </div>
        </header>
        <div className="flex flex-col p-20 justify-center items-start">
          <div className="mb-20 text-6xl tracking-widest">Items</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {ItemImage.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:grid md:grid-cols-2  border border-white p-4 rounded-md"
              >
                <img
                  src={item.url}
                  alt={`NFT ${index}`}
                  className="md:w-64 md:h-64 border-2 mr-2"
                />
                <div className="ml-6">
                  <div className="text-3xl font-bold mb-6">{item.name}</div>
                  <div className="text-lg font-bold mb-6">
                    아이템 부착 위치
                    <div className="text-base font-normal">{item.position}</div>
                  </div>
                  <div className="text-lg font-bold mb-6">
                    가격
                    <div className="text-base font-normal">
                      {item.price} Eth
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="border border-b-zinc-300 px-6 py-2 rounded-md"
                      ref={modalRef}
                      onClick={() => openItemModal(index)}
                    >
                      구매하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {modalIsOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center modal px-10 ">
            <div className="font-bold text-2xl mb-6">My NFTs</div>
            <div className="modal-content border border-white w-full h-4/5 flex justify-between text-2xl font-bold p-4 relative">
              <div className="w-1/2 h-full overflow-y-scroll scrollBar mr-4">
                <div className="grid grid-cols-3 gap-4">
                  {lengthyImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`NFT ${index}`}
                      className="w-full h-auto"
                      onClick={() => {
                        handleImageClick(index);
                      }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {wideImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`NFT ${index}`}
                      className="w-full h-auto"
                      onClick={() => {
                        handleWideImageClick(index);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-pink-200 w-1/2 relative">
                {selectedNFTImage && (
                  <ItemCanvas
                    img={selectedNFTImage}
                    ItemIndex={ItemIndex}
                    size={size}
                    setEnd={setEnd}
                    // setItemOnImage={setItemOnImage}
                  />
                )}
                <button
                  className="bg-yellow-200 absolute -top-5 -right-5"
                  onClick={closeItemModal}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parts;
