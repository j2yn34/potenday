import HighSatisfactionSection from "./HighSatisfactionSection";

const HighSatisfactionList: React.FC = () => {
  const keyword = "직장동료";
  const sections = Array.from({ length: 3 });

  return (
    <>
      {sections.map((_, index) => (
        <HighSatisfactionSection key={index} keyword={keyword} />
      ))}
    </>
  );
};

export default HighSatisfactionList;
