import firebase from "firebase/app";
import "firebase/database";
import { useState } from "react";
import database from "./firebase.js";

const Main = () => {
  const [account, setAccountAddress] = useState("");
  const [password, setPassword] = useState("");

  // 비밀번호를 Firebase에 저장하는 함수
  const savePassword = () => {
    // accountAddress를 key로 사용하여 데이터베이스에 비밀번호 저장
    database
      .ref(`passwords/${accountAddress}`)
      .set(password)
      .then(() => {
        console.log("비밀번호 저장 완료");
      })
      .catch((error) => {
        console.error("비밀번호 저장 실패:", error);
      });
  };

  // accountAddress를 설정하는 함수 (예: MetaMask 연동)
  const setAccount = (address) => {
    setAccountAddress(address);
  };

  // password를 설정하는 함수
  const setPasswordValue = (value) => {
    setPassword(value);
  };

  return (
    <div>
      {/* MetaMask 연동 버튼 등을 통해 accountAddress 설정 */}
      <button onClick={() => setAccount("0x...")}>Set Account</button>

      {/* 비밀번호 설정 input */}
      <input
        type="password"
        onChange={(e) => setPasswordValue(e.target.value)}
      />

      {/* 비밀번호 저장 버튼 */}
      <button onClick={savePassword}>Save Password</button>
    </div>
  );
};

export default Main;
