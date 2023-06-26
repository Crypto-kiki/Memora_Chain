import { useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const { account, setAccount } = useState(); // Context에서 account 값 가져오기

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
    <div className="w-[1702px] mx-auto flex flex-col">
      <div className="w-full flex flex-col bg-[#ccdbe7]">
        <div className="bg-[#F3EED4] h-[1080px] flex flex-col justify-center">
          <div className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider text-[#686667]">
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
              <Link to="/mypage">
                <div>Mypage</div>
              </Link>
            </div>
          </div>
          <video autoPlay muted loop width="100%" height="100%">
            <source
              src={`${process.env.PUBLIC_URL}/image/memorachain.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
        <div className="bg-[#E3C9B2] h-[1200px] mt-6">
          <div className="w-3/4 relative">
            <div>Logo</div>
            <img
              src={`${process.env.PUBLIC_URL}/image/3.png`}
              alt="image1"
              className="h-[800px] absolute left-20 top-20 border-8 z-10 border-[#f3eed4]"
            />
            <img
              src={`${process.env.PUBLIC_URL}/image/2.png`}
              alt="image2"
              className="h-[800px] absolute left-1/2 top-56 border-8 border-[#f3eed4]"
            />
            <img
              src={`${process.env.PUBLIC_URL}/image/7.png`}
              alt="image7"
              className="h-[300px] absolute left-[700px] top-[650px] z-10 border-8 border-[#f3eed4]"
            />
          </div>
        </div>
        <div className="bg-[#F3EED4] h-[700px] flex flex-col items-center justify-center mt-6">
          <div className="w-3/4">
            <div className="text-2xl text-[#C6BBA4]">
              Unforgettable Memories, Forever Immutable
            </div>
            <div className="text-8xl tracking-widest mt-4 mb-10">
              MEMORA CHAIN.
            </div>
            <span className="border border-[#c6bba4] p-2 text-[#c6bba4]">
              Made by Kimshinjo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
