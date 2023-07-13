import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { useContext, useState, useEffect } from "react";
import MyNfts from "../components/MyNfts";
import axios from "axios";
import { FiPower } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const MyPage = () => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const { account, setAccount } = useContext(AccountContext);

  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdsWithMetadataUris, setTokenIdsWithMetadataUris] = useState({});
  const [metadataUris, setMetadataURIs] = useState([]);
  const [burnTx, setBurnTx] = useState(null);
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

  const handleBurnTx = (tx) => {
    setBurnTx(tx);
  };

  const connectWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) {
        setAccount(accounts[0]);
      }
      if (parseInt(window.ethereum.networkVersion) !== 11155111) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
      alert("계정 정보를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    console.log(account);
  }, [account]);

  const onClickLogOut = () => {
    setAccount("");
  };

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
  }, [account]);

  const getTokenUris = async () => {
    try {
      const uris = {};
      const token = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const metadataUri = await contract.methods
          .metadataUri(tokenIds[i])
          .call();
        const response = await axios.get(metadataUri); // URI를 사용하여 이미지 데이터를 가져옴
        const imageUrl = response.data.image;
        uris[imageUrl] = tokenIds[i];
        token.push(tokenIds[i]);
      }
      setTokenIdsWithMetadataUris(uris);
      console.log(tokenIdsWithMetadataUris);
    } catch (error) {
      console.error(error);
    }
  };

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
      console.log(metadataUris);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tokenIds.length > 0) {
      getTokenUrisForImage();
      getTokenUris();
    }
  }, [tokenIds]);

  useEffect(() => {
    console.log(metadataUris);
  }, [metadataUris]);

  useEffect(() => {
    console.log(burnTx);
    setBurnTx("");
    getMyNfts();
  }, [burnTx]);

  return (
    <motion.div
      className="flex justify-between min-h-screen myPageBackground w-full pb-40"
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
                className="hidden md:flex md:w-28"
              />
              <img
                src={`${process.env.PUBLIC_URL}/image/logo7mobile.png`}
                className="flex md:hidden w-14"
              />
            </div>
          </Link>
          <div className="md:hidden absolute z-10 top-0 right-0 w-full  ">
            {isMenuOpen ? (
              <>
                <div
                  className="fixed inset-0 opacity-30 bg-black "
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                ></div>
                <div
                  className={`bg-gray-100 text-black overflow-hidden absolute z-10 top-0 right-0  w-2/5   min-h-screen `}
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
          <div className="border border-[#f3f2dc] w-40 md:w-80 text-center text-xl md:text-5xl mt-5 md:mt-0 py-2 md:py-6 px-4 md:px-10 tracking-widest">
            Gallery
          </div>
        </div>
        <div className="mt-10 md:mt-44">
          <MyNfts
            metadataUris={metadataUris}
            tokenIds={tokenIds}
            tokenIdsWithMetadataUris={tokenIdsWithMetadataUris}
            onBurnTx={handleBurnTx}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MyPage;
