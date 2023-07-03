import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { useContext, useState, useEffect } from "react";
import MyNfts from "../components/MyNfts";
import axios from "axios";

const MyPage = () => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const { account, setAccount } = useContext(AccountContext);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdsWithMetadataUris, setTokenIdsWithMetadataUris] = useState({});
  const [metadataUris, setMetadataURIs] = useState([]);
  const [burnTx, setBurnTx] = useState(null);

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
  }, [account, burnTx]);

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

  // useEffect(() => {
  //   console.log(metadataUris);
  // }, [metadataUris]);

  return (
    <div className="flex justify-between min-h-screen myPageBackground w-full">
      {/* <div className="film-left w-24" /> */}
      <div className="w-full flex flex-col">
        <header className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider">
          <Link to="/">
            <div className="mt-6">
              <img
                src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                className="w-28"
                alt="Logo"
              />
            </div>
          </Link>
          <div className="flex">
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
                <div className="font-bold">MyPage</div>
              ) : (
                <div>Login</div>
              )}
            </Link>
          </div>
        </header>
        <div className="flex justify-center items-center">
          <div className="border border-[#f3f2dc] w-80 text-center text-5xl py-6 px-10 tracking-widest">
            Gallery
          </div>
        </div>
        <div className="mt-44">
          <MyNfts
            metadataUris={metadataUris}
            tokenIds={tokenIds}
            tokenIdsWithMetadataUris={tokenIdsWithMetadataUris}
            onBurnTx={handleBurnTx}
          />
          ;
        </div>
      </div>
      {/* <div className="film-right w-24" /> */}
    </div>
  );
};

export default MyPage;
