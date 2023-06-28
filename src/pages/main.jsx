import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import { AccountContext } from "../AccountContext";

const Main = () => {
  const { account, setAccount } = useContext(AccountContext); // Context에서 account 값과 setAccount 함수 가져오기

  const slideImages = [
    { url: `${process.env.PUBLIC_URL}/image/1.png` },
    { url: `${process.env.PUBLIC_URL}/image/2.png` },
    { url: `${process.env.PUBLIC_URL}/image/3.png` },
    { url: `${process.env.PUBLIC_URL}/image/4.png` },
    { url: `${process.env.PUBLIC_URL}/image/5.png` },
    { url: `${process.env.PUBLIC_URL}/image/6.png` },
    { url: `${process.env.PUBLIC_URL}/image/7.png` },
  ];

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

  return (
    <div className="flex justify-between bg-[#CCDBE7] min-w-[1630px]">
      <div className="film-left w-24" />
      <div className="w-full flex flex-col px-4">
        <div className="bg-[#F3EED4]">
          <header className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider text-[#686667]">
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
          </header>
        </div>
        <video autoPlay muted loop width="100%" height="100%">
          <source
            src={`${process.env.PUBLIC_URL}/image/memorachain.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="bg-[#E3C9B2] h-screen relative justify-center items-center mt-6">
          <img
            src={`${process.env.PUBLIC_URL}/image/mainSecond(2).png`}
            className="absolute z-10 top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/mainSecond(1).png`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/mainSecond(3).png`}
            className="absolute z-10 top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="justify-center items-center mt-6">
          <MainSlider />
        </div>
        <div className="flex mt-6 bg-gradient-to-b from-[#85A0BD] from-78.1% via-[#CEC3B7] via-86% via-[#D2B9A6] to-[#B4958D] to-100% justify-around px-40 py-32">
          <div>
            <div className="border-4 border-yellow-100">
              <img
                src={`${process.env.PUBLIC_URL}/image/mainMap.png`}
                className="w-[350px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-4xl mb-10 text-white">
              my stream of consciousness
            </div>
            <div className="text-[#857464] font-semibold flex flex-col justify-center items-center text-lg tracking-widest">
              "Capture Your Memories Forever on the<div>BlockChain"</div>
            </div>
            <div className="text-[#857464] font-semibold flex flex-col justify-center items-center text-lg">
              "Preserve Your Memories Forever as
              <div>NFTs on the Blockchain"</div>
            </div>
            <div className="text-[#857464] font-semibold flex flex-col justify-center items-center text-lg">
              "Savor Your Memories Forever with
              <div>NFTs"</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-6 bg-[#96A9C2] pt-20 pb-10">
          <img
            src={`${process.env.PUBLIC_URL}/image/airplane.png`}
            className="w-1/2"
          />
          <Link to="mint">
            <button className="bg-[#D9D9D9] px-16 py-4 text-2xl mt-10 tracking-wider text-[#857464]">
              mint now
            </button>
          </Link>
        </div>
        <div className="bg-[#F3EED4] grid grid-cols-3 items-center text-[#857464]">
          <img
            src={`${process.env.PUBLIC_URL}/image/Logo.png`}
            className="w-36"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl mb-4">contact us</div>
            <div className="flex flex-col justify-center items-center">
              <div>2023. 06. 23</div>
              <div>copyright@ made by kimshinjo</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>Tel: 010-0000-0000</div>
            <div>Email: memorachain@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="film-right w-24" />
    </div>
  );
};

export default Main;
