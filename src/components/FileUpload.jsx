import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"; // 임의 문자 생성 라이브러리

// const PINATA_API = process.env.REACT_APP_PINATA_API;
// const PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;
const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.
/*
Your "Pinata API Key" acts as your public key for our REST API, and your "Pinata Secret API Key" acts as the password for your public key. The JWT is an encoded mix of the two. Be sure to keep your secret key private.
*/

const FileUpload = (lat, lon, country, city, address) => {
  const [selectedFile, setSelectedFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const upLoadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); // v4라이브러리를 사용해서 임의의 문자열을 생성. 중복방지
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
  };

  // Firebase SDK 초기화
  const firebaseConfig = {
    apiKey: "AIzaSyDsFA5Rc1u5gTtmv2ArgVM1a0AMbW1oh3E",
    authDomain: "memora-chain.firebaseapp.com",
    projectId: "memora-chain",
    storageBucket: "memora-chain.appspot.com",
    messagingSenderId: "199140780697",
    appId: "1:199140780697:web:2ba1b23acdf3669b3aa608",
    measurementId: "G-BWV8CWSHJT",
  };

  firebase.initializeApp(firebaseConfig);

  // Firebase Storage 참조 생성
  const storage = firebase.storage();

  // 파일의 공개 URL 가져오기
  const storageRef = storage.ref(
    "images/1.png4e59b03c-5b78-48de-8fdc-4c7c6fcd4870"
  );
  storageRef
    .getDownloadURL()
    .then((url) => {
      console.log("파일의 공개 URL:", url);
    })
    .catch((error) => {
      console.log("URL 가져오기 실패:", error);
    });

  /*
  const metadata = {
    description: "Make your memory NFT on Memora Chain.",
    // external_url: "https://openseacreatures.io/3",
    image:
      "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    name: "Memora Chain",

    attributes: [
      {
        trait_type: "latitude",
        value: `${lat}`,
      },
      {
        trait_type: "longitude",
        value: `${lon}`,
      },
      {
        trait_type: "country",
        value: `${country}`,
      },
      {
        trait_type: "city",
        value: `${city}`,
      },
      {
        trait_type: "address",
        value: `${address}`,
      },
    ],
  };
  */

  // 업로드 할 파일 선택
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("metadata", metadata);

    const metadata = JSON.stringify({
      name: "File name",
    });

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
      console.log(res.data);
      setIpfsHash(res.data.IpfsHash);
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

  useEffect(() => {}, []);

  return (
    <>
      <label>Choose File</label>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={upLoadImage}>Upload Image</button>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
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
  );
};

export default FileUpload;
