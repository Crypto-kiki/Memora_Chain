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
import { FiPower } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";

const Mint = () => {
  const { account, setAccount } = useContext(AccountContext);
  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.
  const ENCRYPT_KEY = process.env.REACT_APP_ENCRYPT_KEY;

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [temperature, setTemperature] = useState();
  const [weather, setWeather] = useState();
  const [country, setCountry] = useState();
  const [countryCode, setCountryCode] = useState();
  const [city, setCity] = useState();
  const [formatted_address, setFormatted_address] = useState();
  const [message, setMessage] = useState("");
  const [time, setTime] = useState([]);
  const [uploadFileName, setUploadFileName] = useState();

  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 정보 동의 상태를 저장
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

  const getWeatherInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");
        return;
      }
      setCountryCode(response.data.sys.country);
      setWeather(response.data.weather[0].main);
      setTemperature(response.data.main.temp);
    } catch (error) {
      console.error(error);
    }
  }, [lat, lon]);

  const getGeolocation = useCallback(async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        const successCallback = (position) => {
          resolve(position);
        };

        const errorCallback = (error) => {
          reject(error);
        };
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      });
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setIsLocationAllowed(true); // 위치 정보 동의 상태를 true로 설정
    } catch (error) {
      alert("위치 정보에 동의 해주셔야 합니다.");
      console.error(error);
    }
  }, []);

  const mapElement = useRef(null);
  const mapLoaded = useRef(false);

  const initMap = useCallback(() => {
    const { google } = window;
    if (
      !mapElement.current ||
      !google ||
      isNaN(lat) ||
      isNaN(lon) ||
      mapLoaded.current
    )
      return;

    const location = { lat, lng: lon };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
    mapLoaded.current = true;
  }, [lat, lon]);

  const loadScript = useCallback(() => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAP_API}&callback=initMap&language=en`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;

      // 이미 스크립트가 로드된 경우에는 중복으로 로드하지 않음
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.body.appendChild(script);
      }
    } else {
      initMap();
    }
  }, [GOOGLEMAP_API, initMap]);

  useEffect(() => {
    if (!isLocationAllowed) {
      // 위치 정보 동의를 받지 않았으면 위치 정보 요청
      getGeolocation();
    } else {
      // 위치 정보가 허용되면 geocoding 호출
      const fetchGeocoding = async () => {
        try {
          const geocoding = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLEMAP_API}&language=en`
          );
          setCountry(
            geocoding.data.results[geocoding.data.results.length - 1]
              .formatted_address
          );
          setCity(
            geocoding.data.results[
              geocoding.data.results.length - 2
            ].address_components[0].long_name.toUpperCase()
          );
          setFormatted_address(geocoding.data.results[0].formatted_address);
          getWeatherInfo();
        } catch (error) {
          console.error(error);
        }
      };
      fetchGeocoding();
    }
  }, [isLocationAllowed, getGeolocation]);

  useEffect(() => {
    if (lat !== null && lon !== null && mapLoaded.current) {
      getWeatherInfo();
    }
  }, [lat, lon, mapLoaded, getWeatherInfo]);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  const [selectedFile, setSelectedFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();
  const [canvasIndex, setCanvasIndex] = useState();

  // const [decryptedIpfs, setDecryptedIpfs] = useState();

  // Firebase updload 하기
  const [downloadURL, setDownloadURL] = useState(null);
  const [metadataURI, setMetadataURI] = useState();
  const [canvasImgurl, setCanvasImgurl] = useState();
  const [size, setSize] = useState([]);
  const [selectedFileURL, setSelectedFileURL] = useState();
  const [nftBlockHash, setNftBlockHash] = useState();

  // 이미지 선택하면 selectedFile 값 저장하기
  const handleFileChange = async (event) => {
    try {
      if (!account) {
        await connectWithMetamask();
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        setSelectedFile(file);
        setSelectedFileURL(URL.createObjectURL(file));
        return;
      } else {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        setSelectedFile(file);
        setSelectedFileURL(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const checkTime = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.toLocaleString("en", { month: "short" });
    let day = getDaySuffix(now.getDate());

    setTime([year, month, day]);
  };

  useEffect(() => {
    checkTime();
  }, [selectedFile]);

  useEffect(() => {
    if (size.length > 2 && size[0] == 1) {
      setSize([1]);
    }
  }, [size]);

  // Firebase 파일 업로드 후 업로드 된 주소 받아오기
  const upLoadImage = async () => {
    if (selectedFile && account) {
      try {
        // base64 데이터를 Blob으로 변환
        const blob = await fetch(canvasImgurl).then((res) => res.blob());

        // Blob을 파일로 변환
        const file = new File([blob], "image.jpg", { type: blob.type });
        const folderRef = ref(storage, account); // account 폴더에 대한 참조 생성
        // account 폴더 내의 파일에 대한 참조 생성
        const imageRef = ref(folderRef, v4() + selectedFile.name);
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
    } else {
      if (!account && selectedFile) {
        alert("지갑을 연결해 주세요.");
      }
      if (!selectedFile && !account) {
        alert("지갑 연결 후 이미지를 선택해 주세요.");
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
    if (!selectedFile || !downloadURL) {
      console.log("파일을 선택해주세요.");
      return;
    }

    try {
      // base64 데이터를 Blob으로 변환
      const response = await fetch(canvasImgurl);
      const data = await response.blob();

      // Blob을 File 객체로 변환
      const file = new File([data], selectedFile.name, { type: data.type });

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
        // external_url: downloadURL,
        image: downloadURL,
        EncryptedIPFSImgUrl: encryptedIpfs,
        Account: account,
        attributes: [
          {
            trait_type: "Latitude",
            value: lat,
          },
          {
            trait_type: "Longitude",
            value: lon,
          },
          {
            trait_type: "Country",
            value: country,
          },
          {
            trait_type: "City",
            value: city,
          },
          {
            trait_type: "Address",
            value: formatted_address,
          },
          {
            trait_type: "Weather",
            value: weather,
          },
          {
            trait_type: "Temperature",
            value: temperature,
          },
          {
            trait_type: "Message",
            value: message,
          },
          {
            trait_type: "Uploaded File Name",
            value: uploadFileName,
          },
          {
            trait_type: "parts",
            value: "none",
          },
          {
            trait_type: "canvasIndex",
            value: canvasIndex,
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
    const onClickMint = async () => {
      if (!metadataURI) {
        alert("메타데이터를 업로드해야 합니다.");
        return;
      }
      try {
        const mintNft = await contract.methods
          .mintNft(metadataURI)
          .send({ from: account });
        console.log(mintNft);
        setDownloadURL(null);
        setNftBlockHash(mintNft.blockHash);
      } catch (error) {
        console.error(error);
        setDownloadURL(null);
      }
    };

    if (metadataURI) {
      onClickMint();
    }
  }, [metadataURI]);

  const initialize = () => {
    setSelectedFile("");
    setIpfsHash("");
    setEncryptedIpfs("");
    setDownloadURL(null);
    setMetadataURI("");
    setSelectedFileURL("");
    setCanvasIndex("");
  };

  useEffect(() => {
    initialize();
  }, [nftBlockHash]);

  // const decryptIpfs = () => {
  //   if (encryptedIpfs) {
  //     try {
  //       const decrypted = CryptoJS.AES.decrypt(encryptedIpfs, ENCRYPT_KEY);
  //       const decryptedIpfs = decrypted.toString(CryptoJS.enc.Utf8);
  //       setDecryptedIpfs(decryptedIpfs);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target.elements.message.value);
    console.log(message);
  };

  useEffect(() => {
    const animateBackground = () => {
      const backgroundElement = document.querySelector(".mintBackground");
      let position = 0;
      const speed = 1; // 이미지 속도 조정

      const moveBackground = () => {
        position -= speed;
        backgroundElement.style.backgroundPosition = `${position}px 0`;

        if (position <= -backgroundElement.clientWidth) {
          position = 0;
        }

        requestAnimationFrame(moveBackground);
      };

      moveBackground();
    };

    animateBackground();
  });

  // 민트 모달
  const modalRef = useRef(null);
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

  return (
    <motion.div
      className="flex justify-between min-h-screen mintmobileBackground mintBackground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeIn" }}
    >
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
                  <div className="mt-5 flex justify-center mb-12">
                    <img
                      src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                      className="w-12 "
                    />
                  </div>
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
                      <div>PARTS SHOP</div>
                    </Link>
                    <Link to="/myPage" className="text-lg">
                      MY PAGE
                    </Link>
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
              <div className="mx-10">Parts Shop</div>
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
              <button className="" onClick={onClickLogOut}>
                <FiPower className="" size={33} />
              </button>
            )}
          </div>
        </header>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-6 md:mt-12">
            <div className="block text-[#686667] font-julius text-xl md:text-2xl font-bold">
              "Samples."
            </div>
            <div className="my-4 md:my-10 flex">
              <img
                src={`${process.env.PUBLIC_URL}/image/1.png`}
                className="w-24 md:w-96"
              />
              <img
                src={`${process.env.PUBLIC_URL}/image/2.png`}
                className="w-24 md:w-96 mx-5 md:mx-10"
              />
              <img
                src={`${process.env.PUBLIC_URL}/image/3.png`}
                className="w-24 md:w-96"
              />
            </div>
          </div>
          <div className="hidden md:flex mb-10 md:mb-0 md:text-2xl tracking-widest text-[#686667]">
            "Capture your Memories forever on the Blockchains."
          </div>
          <div className="flex md:hidden  md:mb-0 md:text-2xl tracking-widest text-[#686667]">
            Capture your Memories forever
          </div>
          <div className="flex md:hidden mb-10 md:mb-0 md:text-2xl tracking-widest text-[#686667]">
            on the Blockchains.
          </div>
          <div className="w-full flex flex-col md:flex-row  md:mt-40 mb-10 justify-center items-center">
            <div>
              {!isLocationAllowed && (
                <button
                  onClick={getGeolocation}
                  className="flex justify-center items-center shadow-lg"
                >
                  위치 정보 허용
                </button>
              )}
              {isLocationAllowed && (
                <div
                  ref={mapElement}
                  className="w-[240px]  md:w-[400px] h-60 md:h-80 shadow-2xl"
                />
              )}
            </div>
            <div className="w-3/5 md:w-1/3 flex flex-col mt-5 md:mt-0 md:ml-20  items-center h-60 md:h-80">
              <label className="w-full border border-[#8b8b8b] h-1/4 flex items-center justify-center shadow-lg">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Image Upload
              </label>
              <form
                onSubmit={handleSubmit}
                className="h-full flex flex-col w-full"
              >
                <label className="h-full my-4">
                  <textarea
                    name="message"
                    className="h-full w-full bg-transparent border border-[#8b8b8b] text-center shadow-lg"
                    maxLength={100}
                    placeholder="Write this moment"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full border border-[#8b8b8b] h-1/4 shadow-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="text-[#686667] text-lg md:text-xl mb-10 md:mb-20">
            "My location is with memories."
          </div>
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
          {!selectedFile ? (
            <div className="h-[300px] w-[330px] md:h-[900px] md:w-[1000px] flex flex-col justify-center items-center border border-[#8b8b8b] p-10 md:p-0 text-md  md:text-2xl">
              <div>Image Upload First,</div>
              <div className="hidden md:flex">
                And you can watch NFT Samples by your image
              </div>
              <div className="flex md:hidden">And you can watch NFT </div>
              <div className="flex md:hidden">Samples by your image</div>
            </div>
          ) : (
            <div className="">
              <FileUpload
                file={selectedFileURL}
                setUrl={setCanvasImgurl}
                lat={lat}
                lon={lon}
                country={country}
                city={city}
                address={formatted_address}
                account={account}
                message={message}
                countryCode={countryCode}
                temperature={temperature}
                weather={weather}
                time={time}
                setCanvasIndex={setCanvasIndex}
              />
            </div>
          )}
        </div>
        <div className="mt-5 md:mt-10 text-[#686667] text-lg md:text-xl flex flex-col justify-center items-center">
          "MINT, Your own memory"
        </div>
        <div className="flex justify-center items-center">
          {downloadURL ? (
            <Link to="/mypage">
              <button className="w-44 md:w-56 border border-[#8b8b8b] shadow-lg py-3 mt-5 md:mt-10 mb-36  md:mb-56 text-xl md:text-4xl text-[#686667]">
                Move to Gallery
              </button>
            </Link>
          ) : (
            <button
              onClick={upLoadImage}
              className="w-44 md:w-56 border border-[#8b8b8b] shadow-lg py-3 mt-5 md:mt-10 mb-36 md:mb-56 text-xl md:text-4xl text-[#686667]"
            >
              MINT
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Mint;
