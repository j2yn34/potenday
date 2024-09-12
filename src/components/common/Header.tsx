import headerLogo from "../../assets/logo/headerLogo.svg";
import heartIcon from "../../assets/icons/heart.svg";
import userIcon from "../../assets/icons/user.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed z-40 w-full max-w-[480px] px-5 pt-8 pb-[18px] bg-purple-0">
      <div className="flex justify-between">
        <img src={headerLogo} alt="TIFY 로고" />
        <nav className="flex gap-5">
          <ul className="flex gap-5">
            <li>
              <Link to="/heartlist">
                <img src={heartIcon} alt="관심목록" />
              </Link>
            </li>
            <li>
              <Link to="/mypage">
                <img src={userIcon} alt="내 정보" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
