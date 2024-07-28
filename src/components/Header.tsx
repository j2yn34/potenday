import headerLogo from "../assets/logo/headerLogo.svg";
import heartIcon from "../assets/icons/heart.svg";
import userIcon from "../assets/icons/user.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="px-5 pt-8 pb-[18px] bg-purple-0">
      <div className="flex justify-between">
        <button>
          <img src={headerLogo} alt="TIFY 로고" />
        </button>
        <div className="flex gap-5">
          <Link to="/preparation">
            <img src={heartIcon} alt="관심목록" />
          </Link>
          <Link to="/preparation">
            <img src={userIcon} alt="내 정보" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
