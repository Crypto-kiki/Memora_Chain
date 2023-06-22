import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useState } from "react";
import Main from "./pages/main";
import Mint from "./pages/mint";
import MyPage from "./pages/myPage";
import Header from "./components/Header";

function App() {
  const [account, setAccount] = useState(""); // 계정 상태 저장

  return (
    <BrowserRouter>
      <AccountContext.Provider value={{ account, setAccount }}>
        <Header />
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="/mint" element={<Mint account={account} />} />
          <Route path="/myPage" element={<MyPage account={account} />} />
        </Routes>
      </AccountContext.Provider>
    </BrowserRouter>
  );
}

export default App;
