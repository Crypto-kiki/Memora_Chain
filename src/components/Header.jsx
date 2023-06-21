import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 여부 상태 추가

  const connect = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(res);
        setAccount(res[0]);
        const _balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [res[0].toString(), "latest"],
        });
        setBalance(Number(_balance));
        setLoggedIn(true); // 로그인 상태 업데이트
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Install Metamask");
    }
  };

  // 지갑 주소 일부만 표시하는 함수
  const formatWalletAddress = (address) => {
    const start = address.substring(0, 4);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return (
    <header className="w-full flex justify-between py-2 px-4">
      <Link to="/">Memora Chain</Link>
      <div className="flex">
        <Link to="/mint" className="mr-4">
          Mint
        </Link>
        <Link to="/myPage">My Page</Link>
        {loggedIn ? (
          // 로그인 상태에 따라 다른 컨텐츠 표시
          <div>
            <span className="px-4">{formatWalletAddress(account)}</span>
          </div>
        ) : (
          <button className="px-4" onClick={connect}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
