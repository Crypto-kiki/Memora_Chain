import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({}) => {
  const [account, setAccount] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

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

  const connectWithPhantom = () => {
    // 팬텀 연결 로직을 작성합니다.
    // 여기에 팬텀 연결에 필요한 코드를 추가하세요.
    console.log("팬텀과 연결되었습니다.");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full flex justify-between py-2 px-4 z-10">
      <Link to="/">Memora Chain</Link>
      <div className="md:hidden absolute top-0 right-0 mt-2 mr-2">
        {isMenuOpen ? (
          <div
            className={`menu-container ${
              isMenuOpen ? "open" : ""
            } relative bg-gray-200 rounded p-8`}
          >
            <div className="menu-toggle" onClick={toggleMenu}>
              <div className="menu-icon"></div>
            </div>
            <button
              className="px-4 absolute top-0 right-0 mt-1 mr-0"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <IoIosClose size={33} />
            </button>
            <nav className="flex flex-col justify-center items-center w-full min-h-screen ">
              <Link to="/mint" className="menu-item" onClick={toggleMenu}>
                Mint
              </Link>
              <Link to="/myPage" className="menu-item" onClick={toggleMenu}>
                My Page
              </Link>
              {account ? (
                <div className="menu-item">
                  <div className="px-4">
                    {`${account.substring(0, 4)}...${account.substring(
                      account.length - 4
                    )}`}
                  </div>
                  <button className="ml-2 btn-style" onClick={onClickLogOut}>
                    Logout
                  </button>
                </div>
              ) : (
                <button className="menu-item btn-style" onClick={openPopup}>
                  Login
                </button>
              )}
            </nav>
          </div>
        ) : (
          <button
            className="px-4"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <RxHamburgerMenu size={33} />
          </button>
        )}
      </div>
      <div className="hidden md:flex">
        <Link to="/mint" className="px-4">
          Mint
        </Link>
        <Link to="/myPage">My Page</Link>
        {account ? (
          <div className="flex items-center">
            <div className="px-4">
              {`welcome ${account.substring(0, 4)}...${account.substring(
                account.length - 4
              )} !`}
            </div>
            <button className="ml-2 btn-style" onClick={onClickLogOut}>
              Logout
            </button>
          </div>
        ) : (
          <button className="flex items-center btn-style">
            <span className="px-4" onClick={openPopup}>
              Login
            </span>
          </button>
        )}
      </div>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={closePopup}
        >
          <div className="relative bg-white rounded p-8">
            {/* 지갑 선택 항목 */}
            <div>
              <button
                className="flex hover:bg-orange-100 text-Black font-bold py-2 px-4 rounded-md"
                onClick={connectWithMetamask}
              >
                <img
                  className="w-6"
                  src={`${process.env.PUBLIC_URL}/images/metamask.png`}
                />
                METAMASK
              </button>
            </div>
            <div>
              <button
                className=" hover:bg-purple-100 text-Black font-bold py-2 px-4 rounded-md"
                onClick={connectWithPhantom}
              >
                Phantom
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

/*
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({}) => {
  const [account, setAccount] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

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

  const connectWithPhantom = () => {
    // 팬텀 연결 로직을 작성합니다.
    // 여기에 팬텀 연결에 필요한 코드를 추가하세요.
    console.log("팬텀과 연결되었습니다.");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full flex justify-between py-2 px-4">
      <Link to="/">Memora Chain</Link>
      <div className="md:hidden">
        {isMenuOpen ? (
          <div
            className={`menu-container ${
              isMenuOpen ? "open" : ""
            } relative bg-gray-200 rounded p-8`}
          >
            <div className="menu-toggle" onClick={toggleMenu}>
              <div className="menu-icon"></div>
            </div>
            <button
              className="px-4 absolute top-0 right-0 mt-1 mr-0"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <IoIosClose size={33} />
            </button>
            <nav className="flex flex-col justify-center items-center ">
              <Link to="/mint" className="menu-item" onClick={toggleMenu}>
                Mint
              </Link>
              <Link to="/myPage" className="menu-item" onClick={toggleMenu}>
                My Page
              </Link>
              {account ? (
                <div className="menu-item">
                  <div className="px-4">
                    {`${account.substring(0, 4)}...${account.substring(
                      account.length - 4
                    )}`}
                  </div>
                  <button className="ml-2 btn-style" onClick={onClickLogOut}>
                    Logout
                  </button>
                </div>
              ) : (
                <button className="menu-item btn-style" onClick={openPopup}>
                  Login
                </button>
              )}
            </nav>
          </div>
        ) : (
          <button
            className="px-4"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <RxHamburgerMenu size={33} />
          </button>
        )}
      </div>
      <div className="hidden md:flex">
        <Link to="/mint" className="px-4">
          Mint
        </Link>
        <Link to="/myPage">My Page</Link>
        {account ? (
          <div className="flex items-center">
            <div className="px-4">
              {`welcome ${account.substring(0, 4)}...${account.substring(
                account.length - 4
              )} !`}
            </div>
            <button className="ml-2 btn-style" onClick={onClickLogOut}>
              Logout
            </button>
          </div>
        ) : (
          <button className="flex items-center btn-style">
            <span className="px-4" onClick={openPopup}>
              Login
            </span>
          </button>
        )}
      </div>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={closePopup}
        >
          <div className="relative bg-white rounded p-8">
            지갑 선택 항목
            <div>
              <button
                className="flex hover:bg-orange-100 text-Black font-bold py-2 px-4 rounded-md"
                onClick={connectWithMetamask}
              >
                <img
                  className="w-6"
                  src={`${process.env.PUBLIC_URL}/images/metamask.png`}
                />
                METAMASK
              </button>
            </div>
            <div>
              <button
                className=" hover:bg-purple-100 text-Black font-bold py-2 px-4 rounded-md"
                onClick={connectWithPhantom}
              >
                Phantom
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
*/
