import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import CanvasForm from './CanvasForm/CanvasForm';
import CanvasForm2 from './CanvasForm/CanvasForm2';
import CanvasForm3 from './CanvasForm/CanvasForm3';
import CanvasForm4 from './CanvasForm/CanvasForm4';

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
  const [metaData2, setMetaData] = useState({name : '',  age: 0,});
  const [backimg, setBackImg] = useState();

  const imageUrls = [1,2,3,4];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // name, age 값을 업데이트하는 함수
    setMetaData({
      name: event.target.name.value,
      age: event.target.age.value,
    });
          // console.log(metaData2);  
  };  

  // const ButtonWithImage = ({imageUrl, alt})=> (
  //   <button className='w-[150px] h-[180px] object-cover border-2' onClick = {()=>{setBackImg(imageUrl)}}>
  //     <img src={`${process.env.PUBLIC_URL}/image/${imageUrl}.png`} alt={alt} />      
  //   </button>
  // )
  // useEffect(()=>{
  //   console.log(metaData2);
  // }, [metaData2])


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
      <div className='flex'>
      <form onSubmit={handleSubmit} className='mr-8 ml-6'>
        <label>
          Name:
          <input type="text" name="name" className="border-2 rounded-md ml-2  m-1" />
        </label>
        <br />
        <label className='font-display2' >
          Age:
          <input type="text" name="age" className="border-2 rounded-md ml-2 m-1"  />
        </label>
        <br />
        <button type="submit"  >Submit</button>
        </form>     
        {/* <div  className='border-2 border-black rounded-md p-4 ml-[350px] w-[700px] h-[500px]'>
          <div className='mb-4 ml-4'>
          배경화면 틀 정하기
          </div>
          <div className='grid grid-cols-4 gap-2 justify-items-center'>
            {imageUrls.map((v,i)=>{
              return (
                <ButtonWithImage key={i} imageUrl={v} alt={`Image ${i + 1}`}/>
              );
            })}
          </div>
        </div> */}
      </div>
      {/* {ipfsHash && ( */}
        <>         
        <div className='grid grid-cols-2 gap-4 justify-items-center'>
          <CanvasForm metadata = {metaData2}  />
          <CanvasForm2 metadata = {metaData2}  />
          <CanvasForm3 metadata = {metaData2}  />
          <CanvasForm4 metadata = {metaData2}  />

        </div>
        <div>
          <button className='border-2 '>Font EXample</button>
        </div>
          <div>{encryptedIpfs}</div>
          <div className=''></div>
        </>
      {/* )} */}
    </>
  );
};

export default FileUpload;
