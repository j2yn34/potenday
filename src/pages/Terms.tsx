import { useNavigate } from "react-router-dom";
import TitleHeader from "../components/common/TitleHeader";

const Terms = () => {
  const navigate = useNavigate();

  const termsArr = [
    {
      title: "제 1 조 (목적)",
      content:
        "이 약관은 GDT가 제공하는 상품 추천 생성형 AI 서비스 ‘티피’의 이용 조건 및 절차, 기타 필요한 사항을 규정하는 것을 목적으로 합니다.",
    },
    {
      title: "제 2 조 (회원가입 및 계정관리)",
      content:
        "<ol class='numbered-list'><li>사용자는 GDT가 정한 절차에 따라 회원가입을 해야 하며, 소셜 로그인(카카오톡 API)를 통해 가입할 수 있습니다.</li><li>소셜 로그인을 통해 제공되는 닉네임 정보만을 수집하며, 사용자는 정확한 정보를 제공해야 합니다.</li><li>사용자는 계정 정보의 관리 책임이 있으며, 이를 타인에게 양도하거나 대여할 수 없습니다.</li><li>GDT는 사용자가 약관을 위반하거나 부정한 행위를 할 경우 계정을 제한하거나 해지할 수 있습니다.</li></ol>",
    },
    {
      title: "제 3 조 (서비스 이용)",
      content:
        "<ol class='numbered-list'><li>사용자는 서비스를 이용함에 있어 관련 법령과 본 약관을 준수해야 합니다.</li><li>사용자는 다음 행위를 해서는 안 됩니다:<br/>• 불법적이거나 부당한 목적으로 서비스 이용<br/>• 서비스 운영을 방해하는 행위<br/>• 다른 사용자의 개인정보를 침해하는 행위</li><li>GDT는 서비스의 변경, 중단, 종료에 대한 권리를 가집니다. 서비스 종료 시 사용자에게 사전 통지하며, 이는 네이버 크레딧 금액 및 기타 내부 사정에 따라 발생할 수 있습니다.</li></ol>",
    },
    {
      title: "제 4 조 (개인정보 보호)",
      content:
        "<ol class='numbered-list'><li>GDT는 사용자의 개인정보를 중요시하며, 개인정보 보호법 등 관련 법령에 따라 보호합니다.</li><li>소셜 로그인 (카카오톡 API)을 통해 수집된 닉네임 정보는 서비스 제공 및 관리 목적에만 사용됩니다.</li><li>개인정보의 수집, 이용, 제공, 보관 등에 관한 자세한 사항은 GDT의 개인정보 처리방침을 참조하십시오.</li></ol>",
    },
    {
      title: "제 5 조 (지적 재산권)",
      content:
        "<ol class='numbered-list'><li>서비스 내 제공되는 모든 콘텐츠에 대한 저작권 및 지적 재산권은 GDT에 있습니다.</li><li>사용자는 GDT의 사전 승인 없이 콘텐츠를 복제, 배포, 변조할 수 없습니다.</li><li>사용자가 생성한 콘텐츠에 대한 권리는 사용자에게 있으며, GDT는 서비스 운영을 위해 이를 사용할 수 있는 권리를 가집니다.</li></ol>",
    },
    {
      title: "제 6 조 (면책 조항)",
      content:
        "<ol class='numbered-list'><li>GDT는 서비스 이용과 관련하여 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다.</li><li>GDT는 천재지변, 불가항력 등으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li></ol>",
    },
    {
      title: "제 7 조 (약관의 변경)",
      content:
        "<ol class='numbered-list'><li>GDT는 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지 또는 이메일을 통해 통지합니다.</li><li>사용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li></ol>",
    },
    {
      title: "제 8 조 (기타)",
      content:
        "<ol class='numbered-list'><li>본 약관에 명시되지 않은 사항은 관련 법령과 상관습에 따릅니다.</li><li>회원 탈퇴 후에도 서비스 이용에 관한 로그 기록은 6개월간 보관 후 삭제됩니다. 단, 학습된 데이터로 사용되며, 이는 개인정보 보호법에 따라 관리됩니다.</li><li>GDT는 네이버 크레딧 금액 부족 등 내부 사정에 따라 서비스가 종료될 수 있으며, 이 경우 사용자에게 사전 통지합니다.</li></ol>",
    },
  ];

  return (
    <>
      <div className="relative w-full full-height overflow-hidden px-5 mx-auto bg-purple-50">
        <TitleHeader
          goBack={() => navigate("/mypage")}
          pageTitle={"이용약관"}
        />
        <p className="text-sm pb-12">
          안녕하세요. <br />
          <br />
          취향에 맞는 선물을 주고 싶은 당신에게 제공하는 상품 추천 생성형
          AI서비스 TIFY&#40;이하 “티피”&#41;를 이용해주셔서 감사합니다.
          <br />
          티피 서비스를 제공하는 선물발굴단&#40;이하 “GDT”&#41; 팀이 준비한
          약관을 읽어주시면 감사드리겠습니다.
        </p>
        {termsArr.map((term) => (
          <section key={term.title} className="pb-8">
            <h1 className="font-semibold mb-2">{term.title}</h1>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: term.content }}
            ></div>
          </section>
        ))}
      </div>

      <style>
        {`
          ol.numbered-list {
            list-style-type: decimal; 
            margin-left: 20px;
          }
          ol.numbered-list li {
            margin-bottom: 8px;
          }
        `}
      </style>
    </>
  );
};

export default Terms;
