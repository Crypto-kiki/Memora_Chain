import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full flex justify-between py-2 px-4">
      <Link to="/">Memora Chain</Link>
      <div className="flex">
        <Link to="/mint" className="mr-4">
          Mint
        </Link>
        <Link to="/myPage">My Page</Link>
      </div>
    </header>
  );
};

export default Header;
