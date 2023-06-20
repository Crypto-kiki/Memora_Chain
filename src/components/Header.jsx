import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({}) => {
  const [account, setAccount] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

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

  const connectWithfantom = () => {
    // 팬텀 연결 로직을 작성합니다.
    // 여기에 팬텀 연결에 필요한 코드를 추가하세요.
    console.log("팬텀과 연결되었습니다.");
  };

  return (
    <header className="w-full flex justify-between py-2 px-4">
      <Link to="/">Memora Chain</Link>
      <div className="flex">
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
                메타마스크 연결
              </button>
            </div>
            <div>
              <button
                className=" hover:bg-purple-100 text-Black font-bold py-2 px-4 rounded-md"
                onClick={connectWithfantom}
              >
                팬텀 연결
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

/*
      useEffect(() => {
    const checkMetamask = () => {
      if (typeof window.ethereum !== 'undefined') {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
    };
   */

/*<header className="w-full flex justify-between py-2 px-4">
      <Link to="/">Memora Chain</Link>
      <div className="flex">
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
          <button
            className="flex items-center btn-style"
            onClick={onClickAccount}
          >
            <span className="px-4" onClick={openPopup}>
              Login
            </span>
          </button>
        )}
      </div>
    </header>
  */

export default Header;
