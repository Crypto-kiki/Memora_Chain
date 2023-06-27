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
    <div className="flex justify-between">
      <div className="film-left w-20" />
      <div className="w-full flex flex-col bg-pink-100">
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
        <div className="bg-[#E3C9B2] h-screen relative justify-center items-center">
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
        <div className="flex justify-center items-center">
          <MainSlider />
        </div>
      </div>
      <div className="film-right w-20" />
    </div>
  );
};

export default Main;
