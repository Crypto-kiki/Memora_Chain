import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useEffect, useState } from "react";
import Main from "./pages/main";
import Mint from "./pages/mint";
import MyPage from "./pages/myPage";
import Parts from './pages/parts';

function App() {
  const [account, setAccount] = useState(""); // 계정 상태 저장

  useEffect(() => {
    if (sessionStorage.getItem("loggedInAccount")) {
      setAccount(sessionStorage.getItem("loggedInAccount"));
    }
  }, []);
  return (
    <BrowserRouter>
      <AccountContext.Provider value={{ account, setAccount }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mint" element={<Mint />} />          
          <Route path="/partsshop" element={<Parts />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </AccountContext.Provider>
    </BrowserRouter>
  );
}

export default App;
