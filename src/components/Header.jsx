import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../AccountContext";

const Header = () => {
  const { account, setAccount } = useContext(AccountContext); // Context에서 account 값 가져오기

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
    <header className="relative w-full flex justify-between py-2 px-4 z-10">
      <Link to="/">Memora Chain</Link>
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
          <button
            className="flex items-center btn-style"
            onClick={connectWithMetamask}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
