import Notice from "../components/common/Notice";

const PreparingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center pb-28">
      <Notice
        isSad={true}
        title={"서비스 준비중이에요."}
        text={"조금만 기다려 주세요."}
      />
    </div>
  );
};

export default PreparingPage;
