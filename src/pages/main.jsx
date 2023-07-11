import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MainSlider from "../components/MainSlider";
import { AccountContext } from "../AccountContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { FiPower } from "react-icons/fi";
import { useEffect } from "react";
import { motion } from "framer-motion";

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

  // 메뉴 탭이 열렸을 때 스크롤 막기
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

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
    <motion.div
      className="flex grow  justify-between bg-[#CDDDEA]"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
    >
      <div className="film-left md:w-24 md:visible md:flex-shrink-0" />
      <div className="w-full flex flex-col">
        <div className="bg-[#F3EED4]">
          <header className="flex justify-between items-center px-3 md:px-10 font-habin md:text-2xl tracking-wider text-[#686667]">
            <Link to="/">
              <div className="mt-3">
                <img
                  src={`${process.env.PUBLIC_URL}/image/Logo.png`}
                  className="w-14 md:w-28"
                />
              </div>
            </Link>
            <div className="md:hidden absolute z-10 top-0 right-0 w-full ">
              {isMenuOpen ? (
                <>
                  <div
                    className="fixed inset-0 opacity-30 bg-black "
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                  ></div>
                  <div
                    className={`bg-gray-100 overflow-hidden absolute z-10 top-0 right-0  w-2/5   min-h-screen `}
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
                              LOGOUT
                            </button>
                          </div>
                        ) : (
                          <button
                            className=" btn-style"
                            onClick={connectWithMetamask}
                          >
                            LOGIN
                          </button>
                        )}
                      </div>
                      <Link to="/mint" className="text-lg">
                        <div>MINT</div>
                      </Link>
                      <Link to="/partsshop" className="text-lg">
                        <div>STICKER</div>
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
                    <RxHamburgerMenu size={25} />
                  </button>
                </div>
              )}
            </div>
            <div className="hidden md:flex ">
              <Link to="/mint">
                <div>MINT</div>
              </Link>
              <Link to="/partsshop">
                <div className="mx-10">STICKER</div>
              </Link>
              <Link
                to={account ? "/mypage" : ""}
                onClick={!account ? connectWithMetamask : null}
              >
                {account ? (
                  <div className="mr-10 ">MY PAGE</div>
                ) : (
                  <div>LOGIN</div>
                )}
              </Link>
              {account && (
                <button onClick={onClickLogOut}>
                  <FiPower size={33} />
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
        <div className="bg-[#E3C9B2] mainSecondDiv mainmobileSecondDiv   h-[40vh] md:h-[80vh] relative justify-center items-center my-2 md:mt-3"></div>
        <div className="mainmobileThirdDiv mainThirdDiv w-full h-[48vh] md:h-[90vh]  md:mt-3"></div>
        <div className="flex w-full flex-col md:w-full md:flex-row items-center md:justify-center  font-habin  mt-2 md:mt-3 bg-gradient-to-b from-[#85A0BD] from-78.1% via-[#CEC3B7] via-86% via-[#D2B9A6] to-[#B4958D] to-100%  px-15 md:px-20 py-12 md:pl-32 md:pr-16">
          <div className="md:hidden flex md:font-semibold text-2xl mt-10 text-[#F3EED4]">
            Where time and space meet
          </div>
          <div className="border-4 border-yellow-100 w-3/4 md:w-1/3 my-8 md:ml-8 md:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/image/mainMap.png`}
              className=""
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="hidden md:flex text-xs md:text-4xl mb-10 text-[#F3EED4]  ">
              Where time and space meet
            </div>
            <div className="text-[#493422] flex flex-col justify-center items-center text-md tracking-widest">
              "Preserve the significance of
              <div>the present moment by minting NFTs</div>
              <div className="hidden"> of the present moment</div>
              <div className="hidden">by minting NFTs</div>
            </div>
            <div className="text-[#493422]  flex flex-col justify-center items-center text-md">
              that combine imagery, location coordinates,
              <div>and weather data, all secured</div>
            </div>
            <div className="text-[#493422]  flex flex-col justify-center items-center text-md">
              on the blockchain."
            </div>
          </div>
        </div>

        <div className="hidden md:flex">
          <img
            src={`${process.env.PUBLIC_URL}/image/mainFourthDiv.png`}
            className="w-full mt-3"
          />
        </div>
        <div className="flex md:hidden">
          <img
            src={`${process.env.PUBLIC_URL}/image/AboutUs.png`}
            className="w-full mt-1"
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-1 md:mt-3 bg-[#96A9C2]  md:pt-20 pb-10">
          <img
            src={`${process.env.PUBLIC_URL}/image/AIRPLANE.png`}
            className="hidden md:flex md:w-1/2"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/mainmobile/background3.png`}
            className="flex md:hidden  w-5/6"
          />
          <Link to="/mint">
            <button className="bg-[#D9D9D9] font-habin px-8 md:px-16 py-2 md:py-4 text-xl md:text-2xl md:mt-10 tracking-wider text-[#857464]">
              mint now
            </button>
          </Link>
        </div>
        <div className="bg-[#F3EED4] font-habin flex flex-col md:grid md:grid-cols-3 md:pt-5 md:pb-3 items-center  md:items-center text-[#857464]">
          <img
            src={`${process.env.PUBLIC_URL}/image/Logo.png`}
            className="md:ml-10 w-12 md:w-24  "
          />
          <div className="flex flex-col justify-center items-center">
            <div className="hidden md:flex text-lg mb-4">contact us</div>
            <div className="hidden md:flex flex-col justify-center items-center">
              <div>Tel: 010-3186-9553</div>
              <div>Email: memorachain@gmail.com</div>
            </div>
          </div>
          <div className="flex flex-col md:ml-10 text-xs md:text-base justify-center items-center">
            <div>2023. 06. 23</div>
            <div>copyright@ made by kimshinjo</div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 film-right xl:w-24 lg:w-20 md:w-16 sm:12  " />
    </motion.div>
  );
};

export default Main;
