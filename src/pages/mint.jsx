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

const Mint = ({ account }) => {
  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [formatted_address, setFormatted_address] = useState();
  const [Imgurl, setImgurl] = useState();
  useEffect(()=>{
    console.log(Imgurl);
  },[Imgurl]);


  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 정보 동의 상태를 저장

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
  // const [decryptedIpfs, setDecryptedIpfs] = useState();

  // Firebase updload 하기
  const [downloadURL, setDownloadURL] = useState();
  const [metadataURI, setMetadataURI] = useState();

  const [selectedFileURL, setSelectedFileURL] = useState();

  // 이미지 선택하면 selectedFile 값 저장하기
  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileURL(URL.createObjectURL(file));
  };

  // Firebase 파일 업로드 후 업로드 된 주소 받아오기
  const upLoadImage = async () => {
    console.log(selectedFile);
    if (selectedFile && account) {
      const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
      try {
        await uploadBytes(imageRef, selectedFile);

        const metadata = {
          customMetadata: {
            account: account,
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

    const formData = new FormData();
    formData.append("file", selectedFile);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
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
    }
  }, [ipfsHash]);

  // 이미지 주소 CID값 (IpfsHash) 암호화
  const encryptIpfs = () => {
    const encrypted = CryptoJS.AES.encrypt(ipfsHash, "1234"); // 1234 부분은 회원가입시 비밀번호 설정한 값을 키로 사용하게
    setEncryptedIpfs(encrypted.toString());
  };

  useEffect(() => {
    if (encryptedIpfs) {
      uploadMetadata();
    }
  }, [encryptedIpfs]);

  // 메타데이터 업로드
  const uploadMetadata = async () => {
    try {
      const metadata = {
        Name: "test",
        ImgUrl: downloadURL,
        EncryptedIPFSImgUrl: encryptedIpfs,
        GeolocationInfo: {
          Latitude: lat,
          Longitude: lon,
          Country: country,
          City: city,
          Address: formatted_address,
          Account: account,
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

  /* 복호화
  const decryptIpfs = () => {
    const decrypted = CryptoJS.AES.decrypt(encryptedIpfs, "1234");
    const decryptedIpfs = decrypted.toString(CryptoJS.enc.Utf8);
    setDecryptedIpfs(decryptedIpfs);
  };
  */

  return (
    <div>
      {!isLocationAllowed && (
        <button onClick={getGeolocation}>위치 정보 허용</button>
      )}
      <div>Pinata Pin Check</div>
      {isLocationAllowed && (
        <>
          <div ref={mapElement} className="min-h-[400px]" />
          <div className="flex flex-col my-20 border border-gray-500 p-12">
            <div>현재 위치</div>
            <div>위도 : {lat}</div>
            <div>경도 : {lon}</div>
            <div>국가 : {country}</div>
            <div>도시 : {city}</div>
            <div>상세주소 : {formatted_address}</div>
          </div>
          <>
            <label>Choose File</label>
            <input type="file" onChange={handleFileChange} />      
            <button onClick={upLoadImage}>
              Upload Image to Firebase and Pinata
            </button>
            <div>
              <div>Firebase에 업로드 된 img주소: {downloadURL}</div>
              <div>Pinata에 업로드 된 IPFS 주소 : {ipfsHash}</div>
              <div>Pinata에 업로드 된 EncryptedImg주소: {encryptedIpfs}</div>
              <div>Pinata에 업로드 된 Metadata 주소 : {metadataURI}</div>
              <div>지갑주소 : {account}</div>
              {/* <div>Pinata에 업로드 된 DecryptedImg주소: {decryptedIpfs}</div> */}
            </div>
            {ipfsHash && (
              <>
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                  alt="uploaded ipfsHash"
                />
              </>
            )}
            <div>
              <FileUpload file={selectedFileURL} setUrl={setImgurl} />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Mint;
