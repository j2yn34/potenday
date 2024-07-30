import Notice from "../components/common/Notice";

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      <Notice
        isSad={true}
        title={"페이지를 찾을 수 없어요."}
        text={"올바른 주소로 다시 검석해 보세요."}
        nav={"/"}
        btnName={"홈으로 가기"}
      />
    </div>
  );
};

export default NotFoundPage;
