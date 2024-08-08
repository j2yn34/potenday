import { useRecoilValue } from "recoil";
import { keywordListState } from "../state/recoil";

const KeywordList = () => {
  const keywordList = useRecoilValue<string[]>(keywordListState);
  console.log(keywordList);

  return (
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
  );
};

export default KeywordList;
