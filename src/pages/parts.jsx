import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import { useState, useEffect, useRef, useContext } from "react";
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
import ItemCanvas from "../components/ItemCanvas/ItemCanvas";
import ItemCanvas2 from "../components/ItemCanvas/ItemCanvas2";
import ItemCanvas3 from "../components/ItemCanvas/ItemCanvas3";
import ItemCanvas4 from "../components/ItemCanvas/ItemCanvas4";
import ItemCanvas5 from "../components/ItemCanvas/ItemCanvas5";
import ItemCanvas6 from "../components/ItemCanvas/ItemCanvas6";
import { VscChromeClose } from "react-icons/vsc";
import { FiPower } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";

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
  const [selectedImageCanvas, setSelectedImageCanvas] = useState();
  const [selectedNFTSticker, setSelectedNFTSticker] = useState("none");

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    // setQrvalue(DEFAULT_QR_CODE); // QR 코드를 숨김
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // 메뉴 탭이 열렸을 때 스크롤 막기
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const ItemImage = [
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/item1.png`,
      name: "Guitar",
      position: "우측 상단",
      price: "0.001",
    },
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/item2.png`,
      name: "BUILDING",
      position: "우측 상단",
      price: "0.002",
    },
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/item5.png`,
      name: "Swing",
      position: "우측 상단",
      price: "0.003",
    },
    {
      url: `${process.env.PUBLIC_URL}/image/parts/items/item4.png`,
      name: "Flower",
      position: "우측 상단",
      price: "0.004",
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
      setSelectedImageCanvas(metadata.attributes[10].value);
      setSelectedNFTSticker("");
      setSelectedNFTSticker(metadata.attributes[9].value);
    } catch (error) {
      console.error(error);
    }
  };

  // 가로 이미지
  const handleWideImageClick = async (index) => {
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
      setSelectedImageCanvas(metadata.attributes[10].value);
      setSelectedNFTSticker("");
      setSelectedNFTSticker(metadata.attributes[9].value);
    } catch (error) {
      console.error(error);
    }
  };

  // 아이템 모달
  const openItemModal = async (index) => {
    try {
      if (!account) {
        await connectWithMetamask();
      }
      setItemIndex(index);
      setSelectedNFTSticker("none");
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  const closeItemModal = () => {
    setSelectedImageInfo("");
    setSelectedImageCanvas("");
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

  // const upLoadImage = async () => {
  //   if (selectedNFTImage && account) {
  //     try {
  //       // base64 데이터를 Blob으로 변환
  //       const blob = await fetch(itemOnImage).then((res) => res.blob());

  //       // Blob을 파일로 변환
  //       const file = new File([blob], "image.jpg", { type: blob.type });
  //       console.log(file);
  //       const folderRef = ref(storage, account); // account 폴더에 대한 참조 생성
  //       // account 폴더 내의 파일에 대한 참조 생성
  //       const imageRef = ref(folderRef, v4() + selectedNFTImage.name);
  //       // const imageRef = ref(storage, `images/selectedFile.name}`);
  //       await uploadBytes(imageRef, file);

  //       const metadata = {
  //         customMetadata: {
  //           account: account,
  //         },
  //       };
  //       await updateMetadata(imageRef, metadata);

  //       const url = await getDownloadURL(imageRef);
  //       setDownloadURL(url);

  //       // 업로드된 파일의 이름 받기
  //       const fileName = imageRef.name;
  //       console.log("Firebase Uploaded: ", fileName);
  //       setUploadFileName(fileName);
  //       console.log(uploadFileName);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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
        setUploadFileName(fileName);
        console.log("Firebase Uploaded: ", fileName);
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
            value: uploadFileName,
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
          .send({
            from: account,
            value: ItemImage[ItemIndex].price * 10 ** 18,
          });
        console.log(mintNft);
        setNftBlockHash(mintNft.blockHash);
      } catch (error) {
        console.error(error);
        setDownloadURL(null);
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
    setSize("");
    setItemOnImage("");
    setSelectedImageInfo("");
    setSelectedImageCanvas("");
    setSelectedNFTSticker("");
    getMyNfts();
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

  const modalRef2 = useRef(null);
  useEffect(() => {
    if (downloadURL) {
      setShowVideo(true);
    }
  }, [downloadURL]);

  const [showVideo, setShowVideo] = useState(false);
  const handleVideoLoaded = () => {
    modalRef.current.classList.add("show");
  };

  const handleVideoEnded = () => {
    modalRef.current.classList.remove("show");
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
    <motion.div
      className="flex justify-between min-h-screen partsmobileBackground partsBackground pb-44"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="w-full flex flex-col font-habin">
        <header className="flex justify-between items-center px-3 md:px-10 font-julius md:text-2xl tracking-wider text-[#F3EED4]">
          <Link to="/">
            <div className="mt-3">
              <img
                src={`${process.env.PUBLIC_URL}/image/logo7.png`}
                className="w-14 md:w-28"
              />
            </div>
          </Link>
          <div className="md:hidden absolute z-10 top-0 right-0 w-full text-black ">
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
                            Logout
                          </button>
                        </div>
                      ) : (
                        <button
                          className=" btn-style"
                          onClick={connectWithMetamask}
                        >
                          Login
                        </button>
                      )}
                    </div>
                    <Link to="/mint" className="text-lg">
                      <div>Mint</div>
                    </Link>
                    <Link to="/partsshop" className="text-lg">
                      <div>Sticker</div>
                    </Link>
                    {account && (
                      <Link to="/myPage" className="text-lg">
                        MyPage
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
                  <RxHamburgerMenu className="text-[#F3EED4]" size={25} />
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
              {account ? (
                <div className="mr-10 ">MyPage</div>
              ) : (
                <div>LogIn</div>
              )}
            </Link>
            {account && (
              <button onClick={onClickLogOut}>
                <FiPower size={33} />
              </button>
            )}
          </div>
        </header>
        <div className="flex justify-center items-center">
          <div className="text-[#F3EED4] border border-[#F3EED4] w-40 md:w-80 text-center text-xl md:text-5xl mt-5 md:mt-0 py-2 md:py-6 px-4 md:px-10 tracking-widest">
            Sticker
          </div>
        </div>
        <div className="w-full p-8 md:p-20">
          <div className="w-full grid grid-cols-1 md:place-items-center md:grid-cols-2 gap-8 md:gap-20">
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
                  <div className="text-2xl md:text-4xl my-4 md:my-12 tracking-wide">
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
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {modalIsOpen && (
          <div className="h-screen fixed top-0 left-0 right-0 md:bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center modal p-5 md:px-10 ">
            {downloadURL && (
              <motion.div
                className={`fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center  z-20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeIn" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/image/mint/memorachainGIF.gif`}
                />
              </motion.div>
            )}
            <div className="pl-4 flex flex-col">
              <div className="font-bold text-xl md:text-4xl text-white mb-3 md:mb-6">
                Select
              </div>
              <ul className="md:flex md:flex-col font-bold text-[#F3EED4] text-xs md:text-sm">
                <li>스티커를 미부착한 NFT만 사용 가능합니다.</li>
                <li>
                  스티커를 제거 후 다시 부착할 수 있습니다. 스티커는 제거하면
                  재사용이 불가능합니다.
                </li>
              </ul>
            </div>
            <div className="border border-[#F3EED4] rounded-md w-full h-[80vh] md:h-4/5 mt-3 md:mt-6 flex flex-col md:flex md:flex-row md:justify-between md:text-2xl font-bold p-4 relative">
              <button onClick={closeItemModal}>
                <VscChromeClose className=" text-[#f3f2dc] text-xl md:text-3xl font-extrabold absolute -top-4 -right-4 md:-right-7 md:-top-7 border rounded-full border-[#f3f2dc]" />
              </button>
              <div className="w-full md:w-7/12 h-2/6 md:h-full overflow-y-scroll scrollBar">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="border border-t-white mt-3 md:mt-0 md:border-none w-full h-2/3 md:h-full md:w-5/12 relative flex flex-col justify-center items-center">
                {size == 1 ? (
                  // 가로
                  <>
                    <div className="h-full w-full flex flex-col justify-center md:justify-between items-center ">
                      <div className="h-[80%] md:h-[80%] w-[70%] md:w-[65%] flex justify-center items-center mt-[5%] itemModalBackgroundWide">
                        {selectedNFTSticker == "none" ? (
                          selectedImageCanvas === 0 ? (
                            <ItemCanvas
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 1 ? (
                            <ItemCanvas2
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 2 ? (
                            <ItemCanvas3
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 3 ? (
                            <ItemCanvas4
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 4 ? (
                            <ItemCanvas5
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 5 ? (
                            <ItemCanvas6
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : null
                        ) : (
                          <div className="w-[80%] text-xs md:text-lg">
                            <div>스티커가 부착된 NFT 입니다.</div>
                            <div>NFT당 1개만 부착이 가능합니다.</div>
                            <div>
                              다른 NFT를 선택하시거나
                              <div>MyPage에서 스티커를 제거해주세요.</div>
                            </div>
                            <Link to="/mypage">
                              <button className="mt-8 md:mt-20 border border-black px-5 md:px-10 py-1 md:py-3">
                                MyPage로 이동
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>

                      {selectedNFTSticker == "none" && (
                        <button
                          onClick={upLoadImage}
                          className="w-28 md:w-56 border border-[#F3EED4] shadow-lg py-1 md:py-2 text-xl md:text-4xl text-[#F3EED4] mb-[20%]"
                        >
                          BUY
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  // 세로
                  <>
                    <div className=" h-4/5 md:h-[70%] md:w-[90%] flex flex-col md:justify-between items-center ">
                      <div className="h-[100%] w-[100%]  flex justify-center items-center mt-[5%] itemModalBackgroundLengthy">
                        {selectedNFTSticker == "none" ? (
                          selectedImageCanvas === 0 ? (
                            <ItemCanvas
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 1 ? (
                            <ItemCanvas2
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 2 ? (
                            <ItemCanvas3
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 3 ? (
                            <ItemCanvas4
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 4 ? (
                            <ItemCanvas5
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : selectedImageCanvas === 5 ? (
                            <ItemCanvas6
                              img={selectedNFTImage}
                              ItemIndex={ItemIndex}
                              size={size}
                              setEnd={setEnd}
                              setItemOnImage={setItemOnImage}
                            />
                          ) : null
                        ) : (
                          <div className="w-[80%] md:w-[60%] text-xs md:text-lg text-center">
                            <div>스티커가 부착된 NFT 입니다.</div>
                            <div>NFT당 1개만 부착이 가능합니다.</div>
                            <div>
                              다른 NFT를 선택하시거나
                              <div>MyPage에서 스티커를 제거해주세요.</div>
                            </div>
                            <Link to="/mypage">
                              <button className="mt-8 md:mt-20 border border-black  px-5 md:px-10 py-1 md:py-3">
                                MyPage로 이동
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                      {selectedNFTSticker == "none" && (
                        <button
                          onClick={upLoadImage}
                          className="w-28 md:w-56 border border-[#F3EED4] shadow-lg py-1 md:py-2 text-xl md:text-4xl text-[#F3EED4] mb-[20%]"
                        >
                          BUY
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Parts;
