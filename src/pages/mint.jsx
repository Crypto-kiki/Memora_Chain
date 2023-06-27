import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import { useCallback, useState, useEffect, useRef } from "react";
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
import SimpleImageSlider from "react-simple-image-slider";

const Mint = () => {
  const [account, setAccount] = useState(); // Context에서 account 값 가져오기

  const slideImages = [
    { url: `${process.env.PUBLIC_URL}/image/1.png` },
    { url: `${process.env.PUBLIC_URL}/image/2.png` },
    { url: `${process.env.PUBLIC_URL}/image/3.png` },
  ];

  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.
  const ENCRYPT_KEY = process.env.REACT_APP_ENCRYPT_KEY;

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [formatted_address, setFormatted_address] = useState();
  const [Imgurl, setImgurl] = useState();
  useEffect(() => {
    console.log(Imgurl);
  }, [Imgurl]);

  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 정보 동의 상태를 저장

  const connectWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]); // Context의 account 값 설정
    } catch (error) {
      console.error(error);
      alert("계정 정보를 불러오는데 실패하였습니다.");
    }
  };

  const onClickLogOut = () => {
    setAccount(""); // Context의 account 값 설정
  };

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

  const getWeatherInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");
        return;
      }
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [lat, lon]);

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
          console.log(geocoding);
          setCountry(
            geocoding.data.results[geocoding.data.results.length - 1]
              .formatted_address
          );
          setCity(
            geocoding.data.results[geocoding.data.results.length - 2]
              .address_components[0].long_name
          );
          setFormatted_address(geocoding.data.results[0].formatted_address);
        } catch (error) {
          console.error(error);
        }
      };
      fetchGeocoding();
    }
  }, [isLocationAllowed, getGeolocation, lat, lon, setCountry]);

  useEffect(() => {
    if (lat !== null && lon !== null && mapLoaded.current) {
      getWeatherInfo();
    }
  }, [lat, lon, mapLoaded, getWeatherInfo]);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();
  const [decryptedIpfs, setDecryptedIpfs] = useState();

  // Firebase updload 하기
  const [downloadURL, setDownloadURL] = useState();
  const [metadataURI, setMetadataURI] = useState();
  const [canvasImgurl, setCanvasImgurl] = useState();
  useEffect(() => {
    console.log(canvasImgurl);
  }, [canvasImgurl]);

  const [selectedFileURL, setSelectedFileURL] = useState();

  // 이미지 선택하면 selectedFile 값 저장하기
  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    console.log(file);
    setSelectedFile(file);
    setSelectedFileURL(URL.createObjectURL(file));
  };

  // Firebase 파일 업로드 후 업로드 된 주소 받아오기
  const upLoadImage = async () => {
    if (selectedFile && account) {
      try {
        // base64 데이터를 Blob으로 변환
        const blob = await fetch(canvasImgurl).then((res) => res.blob());

        // Blob을 파일로 변환
        const file = new File([blob], "image.jpg", { type: blob.type });
        const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
        await uploadBytes(imageRef, file);

        const metadata = {
          customMetadata: {
            account: account,
            country: country,
            city: city,
          },
        };
        await updateMetadata(imageRef, metadata);

        const url = await getDownloadURL(imageRef);
        setDownloadURL(url);

        console.log("메타데이터 업데이트 성공");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("지갑을 연결해 주세요.");
    }
  };

  useEffect(() => {
    if (downloadURL) {
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
      console.log(ipfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ipfsHash) {
      encryptIpfs();
      decryptIpfs();
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
      decryptIpfs();
    }
  }, [encryptedIpfs]);

  // 메타데이터 업로드
  const uploadMetadata = async () => {
    try {
      const metadata = {
        description: "Unforgettable Memories, Forever Immutable",
        external_url: downloadURL,
        image: downloadURL,
        name: "MemoraChain",
        EncryptedIPFSImgUrl: encryptedIpfs,
        Account: account,
        attributes: {
          Geolocation: [
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
          ],
        },
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
      } catch (error) {
        console.error(error);
      }
    };

    if (metadataURI) {
      onClickMint();
    }
  }, [metadataURI]);

  const decryptIpfs = () => {
    if (encryptedIpfs) {
      try {
        const decrypted = CryptoJS.AES.decrypt(encryptedIpfs, ENCRYPT_KEY);
        const decryptedIpfs = decrypted.toString(CryptoJS.enc.Utf8);
        setDecryptedIpfs(decryptedIpfs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-between min-h-screen">
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/image/left.png`}
          className="w-14"
        />
      </div>
      <div className="w-full mx-auto flex flex-col h-screen bg-gradient-to-b from-[#85A0BD] from-78.1% via-[#CEC3B7] via-86% via-[#D2B9A6] to-[#B4958D] to-100%">
        <div className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider text-[#686667]">
          <Link to="/">
            <div className="mt-6">
              <img
                src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                className="w-28"
              />
            </div>
          </Link>
          <div className="flex">
            <Link to="/mint">
              <div>Mint</div>
            </Link>
            <Link to="/dashboard">
              <div className="mx-10">DashBoard</div>
            </Link>
            <Link
              to={account ? "/mypage" : ""}
              onClick={!account ? connectWithMetamask : null}
            >
              {account ? <div>MyPage</div> : <div>Login</div>}
            </Link>
          </div>
        </div>
        <div className="flex justify-between mt-16 px-20">
          <div className="p-3">
            <span className="block mb-2 text-[#686667] font-julius">
              Sample
            </span>
            <SimpleImageSlider
              width={423}
              height={752}
              images={slideImages}
              showBullets={true}
              showNavs={true}
              navMargin={-13}
              slideDuration={1}
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <div className="text-2xl mb-10 tracking-widest">
                "Capture your Memories forever on the Blockchains."
              </div>
              <div className="flex w-full justify-between">
                {!isLocationAllowed && (
                  <button
                    onClick={getGeolocation}
                    className="flex justify-center items-center"
                  >
                    위치 정보 허용
                  </button>
                )}
                {isLocationAllowed && (
                  <div ref={mapElement} className="w-80 h-80" />
                )}
                <div className="flex flex-col w-full">
                  <label className="border border-blue-500">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    Image Upload
                  </label>
                  <div>텍스트</div>
                </div>
              </div>
              <button onClick={upLoadImage}>MINT </button>
            </div>
          </div>
        </div>
      </div>
      {/* <FileUpload
        file={selectedFileURL}
        setUrl={setCanvasImgurl}
        lat={lat}
        lon={lon}
        country={country}
        city={city}
        address={formatted_address}
        account={account}
      /> */}
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/image/left.png`}
          className="w-14"
        />
      </div>
    </div>
  );
};

export default Mint;

/*
<div>
  <div>Firebase에 업로드 된 img주소: {downloadURL}</div>
  <div>Pinata에 업로드 된 IPFS 주소 : {ipfsHash}</div>
  <div>Pinata에 업로드 된 EncryptedImg주소: {encryptedIpfs}</div>
  <div>Pinata에 업로드 된 Metadata 주소 : {metadataURI}</div>
  <div>지갑주소 : {account}</div>
  <div>Pinata에 업로드 된 DecryptedImg주소: {decryptedIpfs}</div>
</div>
  */

{
  /* <div>
      {!isLocationAllowed && (
        <button onClick={getGeolocation}>위치 정보 허용</button>
      )}
      <div>Pinata Pin Check</div>
      {isLocationAllowed && (
        <>
          <div ref={mapElement} className="min-h-[400px] w-96" />
          <div className="flex flex-col my-20 border border-gray-500 p-12"></div>
          <>
            <label>Choose File</label>
            <input type="file" onChange={handleFileChange} />
            <button onClick={upLoadImage}>민팅하기 </button>

            {ipfsHash && (
              <>
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                  alt="uploaded ipfsHash"
                />
              </>
            )}
            <div>
              <FileUpload
                file={selectedFileURL}
                setUrl={setCanvasImgurl}
                lat={lat}
                lon={lon}
                country={country}
                city={city}
                address={formatted_address}
                account={account}
              />
            </div>
          </>
        </>
      )}
    </div> */
}
