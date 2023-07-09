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
<<<<<<< HEAD
      <AccountContext.Provider value={{ account, setAccount }}>
        <AnimatePresence>
=======
      <AnimatePresence>
        <AccountContext.Provider value={{ account, setAccount }}>
>>>>>>> origin/0709habin
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/partsshop" element={<Parts />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
<<<<<<< HEAD
        </AnimatePresence>
      </AccountContext.Provider>
=======
        </AccountContext.Provider>
      </AnimatePresence>
>>>>>>> origin/0709habin
    </BrowserRouter>
  );
}

export default App;
