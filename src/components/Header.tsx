import headerLogo from "../assets/logo/headerLogo.svg";
import heartIcon from "../assets/icons/heart.svg";
import userIcon from "../assets/icons/user.svg";

const Header = () => {
  return (
    <div className="px-5 pt-8 pb-[18px] bg-purple-50">
      <div className="flex justify-between">
        <button>
          <img src={headerLogo} alt="TIFY 로고" />
        </button>
        <div className="flex gap-5">
          <button>
            <img src={heartIcon} alt="관심목록" />
          </button>
          <button>
            <img src={userIcon} alt="내 정보" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
