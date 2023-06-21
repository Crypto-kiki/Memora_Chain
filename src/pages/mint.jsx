import { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"; // 임의 문자 생성 라이브러리
import { format } from "crypto-js";
// test

const Mint = () => {
  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;
  const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [formatted_address, setFormatted_address] = useState();

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

  // 비동기라 South Korea를 불렀다가 KR까지 부르게 됨. 따라서 아래 useEffect 써야 함.
  useEffect(() => {
    console.log(lat);
    console.log(lon);
    console.log(country);
  }, [lat, lon, country]);

  const [selectedFile, setSelectedFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();

  // Firebase updload 하기
  const [imageUpload, setImageUpload] = useState(null);
  const [downloadURL, setDownloadURL] = useState();

  // 파일 업로드 후 업로드 된 주소 받아오기
  const upLoadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); // v4라이브러리를 사용해서 임의의 문자열을 생성. 중복방지
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        // alert("Image Uploaded");
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        setDownloadURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Pinata 업로드
  const uploadToPinata = async () => {
    if (!selectedFile) {
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
      console.log(res.data);
      // 이미지 주소 CID값 (IpfsHash) 암호화
      encryptIpfs();
    } catch (error) {
      console.log(error);
    }
  };

  async function uploadFirebaseAndPinata() {
    await upLoadImage();
    if (downloadURL) {
      uploadToPinata();
    }
  }

  const uploadMetadataToPinata = async () => {
    try {
      const metadata = {
        Name: "test",
        ImgUrl: downloadURL,
        EncryptedImgUrl: encryptedIpfs,
        GeolocationInfo: {
          Latitude: lat,
          Longitude: lon,
          Country: country,
          City: city,
          Address: formatted_address,
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

      console.log(metadataRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 주소 CID값 (IpfsHash) 암호화
  const encryptIpfs = () => {
    const encrypted = CryptoJS.AES.encrypt(ipfsHash, "1234");
    setEncryptedIpfs(encrypted.toString());
  };

  // 복호화
  // decryptKey 값 변경 핸들러
  // const handleDecryptKeyChange = (e) => {
  //   setDecryptKey(e.target.value);
  // };

  // const decryptIpfs = () => {
  //   const decrypted = CryptoJS.AES.decrypt(encryptedIpfs, "1234");
  //   const decryptedIpfs = decrypted.toString(CryptoJS.enc.Utf8);
  //   setDecryptedIpfs(decryptedIpfs);
  // };

  useEffect(() => {
    if (ipfsHash) {
      // ipfsHash 값이 업데이트되면 이미지를 표시
      console.log(ipfsHash);
      encryptIpfs();
      console.log(encryptedIpfs);
    }
  }, [ipfsHash]);

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
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button onClick={uploadFirebaseAndPinata}>
              Upload Image to Firebase and Pinata
            </button>

            <div>
              <div>Firebase에 업로드 된 img주소: {downloadURL}</div>
              <div>Pinata에 업로드 된 EncryptedImg주소: {encryptedIpfs}</div>
            </div>
            {/* <input type="file" onChange={changeHandler} />
            <button onClick={uploadToPinata} className="border border-gray-400">
              이미지 업로드
            </button> */}
            <button
              onClick={uploadMetadataToPinata}
              className="border border-gray-400"
            >
              메타데이터 업로드
            </button>
            {ipfsHash && (
              <>
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                  alt="Selected Image"
                />
                <div>{encryptedIpfs}</div>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default Mint;
