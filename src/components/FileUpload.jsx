import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

// const PINATA_API = process.env.REACT_APP_PINATA_API;
// const PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;
const PINATA_JWT = process.env.REACT_APP_PINATA_JWT; // Bearer Token 사용해야 됨.
/*
Your "Pinata API Key" acts as your public key for our REST API, and your "Pinata Secret API Key" acts as the password for your public key. The JWT is an encoded mix of the two. Be sure to keep your secret key private.
*/

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [encryptedIpfs, setEncryptedIpfs] = useState();

  // 업로드 할 파일 선택
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", metadata);

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

  return (
    <>
      <label>Choose File</label>
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
