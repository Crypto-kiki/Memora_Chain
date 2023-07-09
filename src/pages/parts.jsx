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
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";

import { VscChromeClose } from "react-icons/vsc";
import { FiPower } from "react-icons/fi";
import ItemCanvas from '../components/ItemCanvas/ItemCanvas';
import ItemCanvas2 from '../components/ItemCanvas/ItemCanvas2';
import ItemCanvas3 from '../components/ItemCanvas/ItemCanvas3';
import ItemCanvas4 from '../components/ItemCanvas/ItemCanvas4';
import ItemCanvas5 from '../components/ItemCanvas/ItemCanvas5';
import ItemCanvas6 from '../components/ItemCanvas/ItemCanvas6';
import ItemCanvas from "../components/ItemCanvas/ItemCanvas";

const Parts = () => {
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
  const [selectedNFTImage, setSelectedNFTImage] = useState();
  const [selectedTokenId, setSelectedTokenId] = useState();

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
        const response = await axios.get(metadataUri);
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
    console.log(tokenIdsWithMetadataUris);
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
    setSize("");
    setSelectedImageInfo("");
    setSelectedImageCanvas("");
    const imageUrl = lengthyImages[index];
    setSelectedNFTImage(imageUrl);
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    setSelectedTokenId(tokenId);
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
    setSize("");
    setSize("");
    setSelectedImageInfo("");
    setSelectedImageCanvas("");
    const imageUrl = wideImages[index];
    setSelectedNFTImage(imageUrl);
    const tokenId = tokenIdsWithMetadataUris[imageUrl];
    setSelectedTokenId(tokenId);
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
    setSelectedNFTSticker("none");
    setModalIsOpen(true);
  };
  const closeItemModal = () => {
    setModalIsOpen(false);
  };

  // 민팅 코드
  const [downloadURL, setDownloadURL] = useState(null);
  const [metadataURI, setMetadataURI] = useState();
  const [nftBlockHash, setNftBlockHash] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();
  const [uploadFileName, setUploadFileName] = useState();

  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.
  const ENCRYPT_KEY = process.env.REACT_APP_ENCRYPT_KEY;

  const upLoadImage = async () => {
    if (selectedNFTImage && account) {
      try {
        // base64 데이터를 Blob으로 변환
        const blob = await fetch(itemOnImage).then((res) => res.blob());

        // Blob을 파일로 변환
        const file = new File([blob], "image.jpg", { type: blob.type });
        console.log(file);
        const folderRef = ref(storage, account); // account 폴더에 대한 참조 생성
        // account 폴더 내의 파일에 대한 참조 생성
        const imageRef = ref(folderRef, v4() + selectedNFTImage.name);
        // const imageRef = ref(storage, `images/selectedFile.name}`);
        await uploadBytes(imageRef, file);

        const metadata = {
          customMetadata: {
            account: account,
          },
        };
        await updateMetadata(imageRef, metadata);

        const url = await getDownloadURL(imageRef);
        setDownloadURL(url);

        // 업로드된 파일의 이름 받기
        const fileName = imageRef.name;
        console.log("Firebase Uploaded: ", fileName);
        setUploadFileName(fileName);
        console.log(uploadFileName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (downloadURL) {
      console.log(uploadFileName);
      uploadToPinata();
    }
  }, [downloadURL]);

  // Pinata 업로드
  const uploadToPinata = async () => {
    if (!itemOnImage || !downloadURL) {
      console.log("파일을 선택해주세요.");
      return;
    }

    try {
      // base64 데이터를 Blob으로 변환
      const response = await fetch(itemOnImage);
      const data = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([data], itemOnImage.name, { type: data.type });

      const formData = new FormData();
      formData.append("file", file);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );

      setIpfsHash(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ipfsHash) {
      encryptIpfs();
      // decryptIpfs();
    }
  }, [ipfsHash]);

  // 이미지 주소 CID값 (IpfsHash) 암호화
  const encryptIpfs = () => {
    const encrypted = CryptoJS.AES.encrypt(
      `https://teal-rapid-mink-528.mypinata.cloud/ipfs/${ipfsHash}`,
      ENCRYPT_KEY
    );
    setEncryptedIpfs(encrypted.toString());
  };

  useEffect(() => {
    if (encryptedIpfs) {
      uploadMetadata();
      // decryptIpfs();
    }
  }, [encryptedIpfs]);

  // 메타데이터 업로드
  const uploadMetadata = async () => {
    try {
      const metadata = {
        description: "Unforgettable Memories, Forever Immutable",
        image: downloadURL,
        EncryptedIPFSImgUrl: encryptedIpfs,
        Account: account,
        attributes: [
          {
            trait_type: "Latitude",
            value: selectedImageInfo[0].value,
          },
          {
            trait_type: "Longitude",
            value: selectedImageInfo[1].value,
          },
          {
            trait_type: "Country",
            value: selectedImageInfo[2].value,
          },
          {
            trait_type: "City",
            value: selectedImageInfo[3].value,
          },
          {
            trait_type: "Address",
            value: selectedImageInfo[4].value,
          },
          {
            trait_type: "Weather",
            value: selectedImageInfo[5].value,
          },
          {
            trait_type: "Temperature",
            value: selectedImageInfo[6].value,
          },
          {
            trait_type: "Message",
            value: selectedImageInfo[7].value,
          },
          {
            trait_type: "Uploaded File Name",
            value: selectedImageInfo[8].value,
          },
          {
            trait_type: "parts",
            value: ItemIndex,
          },
          {
            trait_type: "canvasIndex",
            value: selectedImageInfo[10].value,
          },
        ],
      };

      const metadataRes = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );
      console.log(metadataRes);
      console.log(metadataRes.data.IpfsHash);
      setMetadataURI(
        `https://teal-rapid-mink-528.mypinata.cloud/ipfs/${metadataRes.data.IpfsHash}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onClickMintPartNft = async () => {
      if (!metadataURI) {
        alert("메타데이터를 업로드해야 합니다.");
        return;
      }
      try {
        const mintNft = await contract.methods
          .mintPartNft(metadataURI, ItemIndex, selectedTokenId)
          .send({ from: account });
        console.log(mintNft);
        setNftBlockHash(mintNft.blockHash);
      } catch (error) {
        console.error(error);
      }
    };

    if (metadataURI) {
      onClickMintPartNft();
    }
  }, [metadataURI]);

  const initialize = () => {
    setSelectedNFTImage("");
    setIpfsHash("");
    setEncryptedIpfs("");
    setDownloadURL(null);
    setMetadataURI("");
  };

  useEffect(() => {
    initialize();
  }, [nftBlockHash]);

  // Canvas
  const [size, setSize] = useState();
  const [end, setEnd] = useState(false);
  const [itemOnImage, setItemOnImage] = useState();

  const loadImageForCanvas = () => {
    const image = new Image();

    image.src = selectedNFTImage;

    image.onload = () => {
      const iw = image.width;
      const ih = image.height;
      if (iw / ih > 1) {
        // 가로가 김
        setSize(1);
        setEnd(true);
      } else if (iw / ih < 1) {
        // 세로가 김
        setSize(2);
        setEnd(true);
      }
    };
  };

  useEffect(() => {
    loadImageForCanvas();
    console.log(size);
  }, [selectedNFTImage]);

  useEffect(() => {
    console.log(size);
  }, [size]);

  useEffect(() => {
    console.log(end);
  }, [end]);

  return (
    <motion.div className="flex justify-between min-h-screen partsmobileBackground partsBackground">
      {/* <div className="film-left w-24" /> */}
      <div className="w-full flex flex-col">
        <header className="flex justify-between items-center px-3 md:px-10 font-julius md:text-2xl tracking-wider text-[#686667]">
          <Link to="/">
            <div className="mt-3">
              <img
                src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                className="w-14 md:w-28"
              />
            </div>
          </Link>
          <div className="md:hidden absolute z-10 top-0 right-0 w-full ">
            {isMenuOpen ? (
              <>
                <div
                  className="fixed inset-0 opacity-30 bg-black "
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                ></div>
                <div
                  className={`bg-gray-100 overflow-hidden absolute z-10 top-0 right-0  w-2/5   min-h-screen `}
                >
                  <Link to="/">
                    <div className="mt-5 flex justify-center mb-12">
                      <img
                        src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                        className="w-12 "
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2 items-start ml-4 w-full ">
                    <div className="text-lg ">
                      {account ? (
                        <div>
                          <button className="" onClick={onClickLogOut}>
                            LOGOUT
                          </button>
                        </div>
                      ) : (
                        <button
                          className=" btn-style"
                          onClick={connectWithMetamask}
                        >
                          LOGIN
                        </button>
                      )}
                    </div>
                    <Link to="/mint" className="text-lg">
                      <div>MINT</div>
                    </Link>
                    <Link to="/partsshop" className="text-lg">
                      <div>Sticker</div>
                    </Link>
                    {account && (
                      <Link to="/myPage" className="text-lg">
                        MY PAGE
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex  justify-end ">
                <button
                  className="mt-3 mr-3 "
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                >
                  <RxHamburgerMenu size={25} />
                </button>
              </div>
            )}
          </div>
          <div className="hidden md:flex ">
            <Link to="/mint">
              <div>Mint</div>
            </Link>
            <Link to="/partsshop">
              <div className="mx-10">Sticker</div>
            </Link>
            <Link
              to={account ? "/mypage" : ""}
              onClick={!account ? connectWithMetamask : null}
            >
              {account ? <div>MyPage</div> : <div>Login</div>}
            </Link>
            {account && (
              <button onClick={onClickLogOut}>
                <FiPower size={33} />
              </button>
            )}
          </div>
        </header>
        <div className="flex flex-col p-20 justify-center items-start">
          <div className="mb-20 text-6xl tracking-widest">Items</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {ItemImage.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:w-[700px] h-40 md:h-80 itemBackground text-[#668585]"
              >
                <div className="flex justify-center items-center ">
                  <img
                    src={item.url}
                    alt={`NFT ${index}`}
                    className="w-24 h-24 md:w-52 md:h-52"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-2xl md:text-5xl font-bold my-4 md:my-12 tracking-wide">
                    {item.name}
                  </div>
                  <div className="text-sm md:text-base font-normal mt-1 md:mt-4">
                    PRICE {item.price} ETH
                  </div>
                  <div className="flex justify-end mt-3 md:mt-5">
                    <button
                      className="text-xl md:text-3xl border border-[#F3EED4] text-[#F3EED4] px-4  md:px-12 md:py-1"
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
              <div className="bg-pink-200 w-1/2 relative flex flex-col justify-center items-center">
                {size == 1 ? (
                  // 가로
                  <div className="w-full flex justify-center items-start overflow-hidden">
                    <ItemCanvas
                      img={selectedNFTImage}
                      ItemIndex={ItemIndex}
                      size={size}
                      setEnd={setEnd}
                      setItemOnImage={setItemOnImage}
                    />
                  </div>
                ) : (
                  // 세로
                  <div className="w-full flex justify-center items-start">
                    <ItemCanvas
                      img={selectedNFTImage}
                      ItemIndex={ItemIndex}
                      size={size}
                      setEnd={setEnd}
                      setItemOnImage={setItemOnImage}
                    />
                  </div>
                )}
                <button
                  onClick={upLoadImage}
                  className="w-56 border border-[#8b8b8b] shadow-lg py-3 text-4xl text-[#686667]"
                >
                  MINT
                </button>
                <button
                  className="bg-yellow-200 absolute -top-10 -right-10"
                  onClick={closeItemModal}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Parts;