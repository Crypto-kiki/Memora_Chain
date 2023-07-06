import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import { AccountContext } from "../AccountContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { FiPower } from "react-icons/fi";

const Main = () => {
  const { account, setAccount } = useContext(AccountContext); // Context에서 account 값과 setAccount 함수 가져오기
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
    sessionStorage.removeItem("loggedInAccount");
  };

  return (
    <div className="flex grow  justify-between bg-pink-300">
      <div className="film-left xl:w-24 lg:w-20 md:w-16 sm:12    flex-shrink-0" />
      <div className="w-full flex flex-col">
        <div className="bg-[#F3EED4]">
          <header className="flex justify-between items-center px-10 font-julius text-2xl tracking-wider text-[#686667]">
            <Link to="/">
              <div className="mt-3">
                <img
                  src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                  className="w-28"
                />
              </div>
            </Link>
            <div className="md:hidden absolute top-0 right-0 mt-2 mr-2 w-3/4 ">
              {isMenuOpen ? (
                <div className={`relative bg-gray-200 rounded p-8 `}>
                  <div>
                    <div>
                      <button
                        className="px-4 absolute top-0 right-0 mt-1 mr-0"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        <IoIosClose size={40} />
                      </button>
                    </div>
                  </div>
                  <nav className="flex flex-col w-full min-h-screen ">
                    <div className="bg-amber-500 p-1 text-xl">
                      <div>
                        <button
                          className="px-4 absolute top-0 right-0 mt-1 mr-0"
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                        >
                          <IoIosClose size={40} />
                        </button>
                      </div>
                      {account ? (
                        <div>
                          <div className="px-4">
                            {`${account.substring(0, 4)}...${account.substring(
                              account.length - 4
                            )}`}
                          </div>
                          <button
                            className="ml-2 btn-style"
                            onClick={onClickLogOut}
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <button className=" btn-style" onClick={openPopup}>
                          Login
                        </button>
                      )}
                    </div>
                    <Link to="/mint" className=" text-xl" onClick={toggleMenu}>
                      Mint
                    </Link>
                    <Link
                      to="/myPage"
                      className=" text-xl"
                      onClick={toggleMenu}
                    >
                      My Page
                    </Link>
                  </nav>
                </div>
              ) : (
                <div className="flex abosolute right-12 ">
                  <button
                    className=" mt-4 mr-16"
                    onClick={() => {
                      setMenuOpen(true);
                    }}
                  >
                    <RxHamburgerMenu size={33} />
                  </button>
                </div>
              )}
            </div>
            <div className="hidden md:flex ">
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
                  <div className="mr-10 ">MyPage</div>
                ) : (
                  <div>LogIn</div>
                )}
              </Link>
              {account && (
                <button className="" onClick={onClickLogOut}>
                  <FiPower className="" size={33} />
                </button>
              )}
            </div>
          </header>
        </div>
        <video autoPlay muted loop width="100%" height="100%">
          <source
            src={`${process.env.PUBLIC_URL}/image/memorachain.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="bg-[#E3C9B2] mainSecondDiv h-[80vh] relative justify-center items-center mt-3"></div>
        <div className="mainThirdDiv w-full  h-[80vh] mt-3"></div>
        <div className="flex mt-3 bg-gradient-to-b from-[#85A0BD] from-78.1% via-[#CEC3B7] via-86% via-[#D2B9A6] to-[#B4958D] to-100% justify-around px-40 py-32">
          <div>
            <div className="border-4 border-yellow-100">
              <img
                src={`${process.env.PUBLIC_URL}/image/mainMap.png`}
                className="w-[350px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-4xl mb-10 text-[#F3EED4]  ">
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
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/image/mainFourthDiv.png`}
            className="w-full mt-3"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-3 bg-[#96A9C2] pt-20 pb-10">
          <img
            src={`${process.env.PUBLIC_URL}/image/airplane.png`}
            className="w-1/2"
          />
          <Link to="/mint">
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
              <div>Tel: 010-0000-0000</div>
              <div>Email: memorachain@gmail.com</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>2023. 06. 23</div>
            <div>copyright@ made by kimshinjo</div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 film-right xl:w-24 lg:w-20 md:w-16 sm:12 " />
    </div>
  );
};

export default Main;
