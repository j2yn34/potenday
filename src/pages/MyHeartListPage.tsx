import { useRecoilValue } from "recoil";
import MyHeartList from "../components/MyHeartList";
import { accessTokenState } from "../state/recoil";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/common/ConfirmModal";
import ScrollToTopButton from "../components/buttons/ScrollToTopBtn";

const MyHeartListPage = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const navigate = useNavigate();

  const cancel = () => {
    navigate("/");
    document.body.style.overflow = "auto";
  };

  const goHome = () => {
    navigate("/login");
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      {token ? (
        <>
          <MyHeartList />
          <ScrollToTopButton />
        </>
      ) : (
        <ConfirmModal
          isSad={false}
          title={"로그인이 필요한 기능이에요"}
          text={"관심 선물을 저장하고 공유해 보세요"}
          leftBtn={cancel}
          confirm={goHome}
          leftName={"취소"}
          rightName={"로그인 하기"}
        />
      )}
    </div>
  );
};

export default MyHeartListPage;
