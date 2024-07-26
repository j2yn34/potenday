const KeywordList = () => {
  const keywordList = ["어머니", " 50대", " 주부", " 요리", " 소품"];

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        {keywordList.map((keyword, index) => (
          <div
            className="flex-center w-fit h-10 bg-orange-500 px-3 rounded-lg"
            key={index}
          >
            <span className="text-white font-medium">{keyword}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default KeywordList;
