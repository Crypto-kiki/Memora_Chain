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

const Parts = () => {
  const { account, setAccount } = useContext(AccountContext); // Context에서 account 값과 setAccount 함수 가져오기
  const [ItemIndex, setItemIndex ] = useState();
  const [wideImages, setWideImages] = useState([]);
  const [lengthyImages, setLengthyImages] = useState([]);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const ItemImage = [
     {url:`${process.env.PUBLIC_URL}/image/shop/parts1.jpg`, name:"태극기"} ,
     {url:`${process.env.PUBLIC_URL}/image/shop/parts2.png`, name:"일장기"} ,
     {url:`${process.env.PUBLIC_URL}/image/shop/parts3.png`, name:"오성기"} ,     
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
        sessionStorage.setItem("loggedInAccount", accounts[0]); // 로그인 상태 저장
      }
    } catch (error) {
      console.error(error);
      alert("계정 정보를 불러오는데 실패하였습니다.");
    }
  };

  const onClickLogOut = () => {
    setAccount("");
  };
  useEffect(()=>{
    console.log(ItemIndex);
  },[ItemIndex])

  const handleImageClick =  (index) => {
    const imageUrl = ItemImage[index];
    setItemIndex(index);
  };

  // const loadImage = async () => {
  //   const lengthy = [];
  //   const wide = [];

  //   try {
  //     await Promise.all(
  //       images.map((imageUrl) => {
  //         return new Promise((resolve) => {
  //           const image = new Image();
  //           image.src = imageUrl;
  //           image.onload = () => {
  //             const iw = image.width;
  //             const ih = image.height;
  //             if (iw > ih) {
  //               wide.push(imageUrl);
  //             } else {
  //               lengthy.push(imageUrl);
  //             }
  //             resolve();
  //           };
  //         });
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLengthyImages(lengthy);
  //   setWideImages(wide);
  // };


  const handleModalClose = () => {
    setItemIndex(null);
  };

  const handleModalOutsideClick = (event) => {
    if (!modalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  const handleWideModalClose = () => {
    setItemIndex(null);

  };

  const handleWideModalOutsideClick = (event) => {
    if (!modalRef2.current.contains(event.target)) {
      handleWideModalClose();
    }
  };

  const onClickMint = async () => {
     try {
       await contract.methods
        .mintPartNft('1',1,1)
        .send({ from: account, value: 1000000000000000});
    } catch (error) {
      console.error(error);
    }
  };

  const onClickRestore = async () => {
    try {
      await contract.methods
       .restoreNft(1)
       .send({ from: account});
   } catch (error) {
     console.error(error);
   }
 };

 

  return (
    <div className="flex justify-between min-h-screen body">
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
              <div className="font-bold">Mint</div>
            </Link>
            <Link to="/partsshop">
              <div className="mx-10">Parts Shop</div>
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
          <div className="mt-12">
            <div className="block text-[#686667] font-julius text-2xl font-bold">
              "Samples."
            </div>
            <div className="grid grid-cols-3 justify-center gap-20">
              {ItemImage.map((item, index) => (
                <div key={index}>
                  <div className='my-10 border-2 border-blue-500 rounded-md p-4 flex h-[150px]'>                 
                  <img
                    src={item.url}
                    alt={`NFT ${index}`}
                   
                    className='w-32 h-28 border-2 mr-2'
                    />
                <div className='w-[240px] border-2 rounded-md'> 
                <div className='flex flex-col items-center justify-center ml-10'>
                <div className='py-2'>
                  이름 : {item.name}
                </div>
                <div className='py-2'>
                  <button className='border-2 rounded-md p-2'  onClick={()=>onClickMint()}>buy 0.001ether</button>
                </div>
                </div>
              </div>
                    </div>  
                </div>
              ))}

            </div>
            <div>
              <button className='border-2 rounded-md p-4 text-2xl align-middle' onClick={()=>onClickRestore()}>Restore</button>
            </div>
        </div>
      </div>
      {/* <div className="film-right w-24" /> */}
    </div>
    </div>
  );
};

export default Parts;
