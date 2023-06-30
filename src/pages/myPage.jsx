import { Link } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { useContext, useState, useEffect } from "react";
import MyNfts from "../components/MyNfts";

const MyPage = () => {
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  const { account, setAccount } = useContext(AccountContext);
  const [tokenIds, setTokenIds] = useState([]);
  const [metadataUris, setMetadataURIs] = useState([]);

  const connectWithMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
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

  const getTokenUris = async () => {
    try {
      const uris = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const response = await contract.methods.metadataUri(tokenIds[i]).call();
        uris.push(response);
      }
      setMetadataURIs(uris);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNfts();
  }, [account]);

  useEffect(() => {
    if (tokenIds.length > 0) {
      getTokenUris();
    }
  }, [tokenIds]);

  useEffect(() => {
    console.log(metadataUris);
  }, [metadataUris]);

  return (
    <div className="flex justify-between min-h-screen bg-[#20457A]">
      <div className="film-left w-24" />
      <div className="w-full flex flex-col text-white">
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
          <div className="border border-white w-80 text-center text-5xl py-6 px-10 tracking-widest">
            Gallery
          </div>
        </div>
        <div className="mt-44">
          <MyNfts metadataUris={metadataUris} />;
        </div>
      </div>
      <div className="film-right w-24" />
    </div>
  );
};

export default MyPage;
