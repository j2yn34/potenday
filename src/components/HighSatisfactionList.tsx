import HighSatisfactionSection from "./HighSatisfactionSection";

const HighSatisfactionList = () => {
  const category = "홈패브릭";
  const sections = Array.from({ length: 3 });

  return (
    <>
      {sections.map((_, index) => (
        <HighSatisfactionSection key={index} category={category} />
      ))}
    </>
  );
};

export default HighSatisfactionList;
