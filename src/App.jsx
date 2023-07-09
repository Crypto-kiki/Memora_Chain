import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import { useEffect, useState } from "react";
import Main from "./pages/main";
import Mint from "./pages/mint";
import MyPage from "./pages/myPage";
import Parts from "./pages/parts";
import { AnimatePresence } from "framer-motion";

function App() {
  const [account, setAccount] = useState(""); // 계정 상태 저장

  return (
    <BrowserRouter>
      <AccountContext.Provider value={{ account, setAccount }}>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/partsshop" element={<Parts />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </AnimatePresence>
      </AccountContext.Provider>
    </BrowserRouter>
  );
}

export default App;
