import { useState, useEffect } from "react";
import axios from "axios";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import HistoryList from "../components/HistoryList";
import { HistoryListType } from "../type";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../state/recoil";

const History = () => {
  const token = useRecoilValue<string>(accessTokenState);
  const [historyList, setHistoryList] = useState<HistoryListType[]>([]);

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "/api/api/v1/user/history",
          headers: { Authorization: `Bearer ${token}` },
          responseType: "json",
        });
        console.log(response.data.data.history);
        setHistoryList(response.data.data.history);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    getHistoryData();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  type GroupedHistoryType = {
    [key: string]: HistoryListType[];
  };

  function transformHistoryData(
    historyList: HistoryListType[]
  ): GroupedHistoryType {
    const transformedData: GroupedHistoryType = {};

    historyList.forEach((item) => {
      const formattedDate = formatDate(item.date);

      if (!transformedData[formattedDate]) {
        transformedData[formattedDate] = [];
      }

      transformedData[formattedDate].push(item);
    });

    return transformedData;
  }

  const groupedHistory = transformHistoryData(historyList);

  return (
    <div className="relative w-full full-height overflow-hidden px-5 mx-auto max-w-screen-lg">
      <div className="absolute z-40 pt-7 -ml-1">
        <Link to="/">
          <IoChevronBackSharp size={24} />
        </Link>
      </div>
      <h1 className="mb-7 pt-7 text-center font-semibold text-xl leading-8">
        최근 본 선물
      </h1>
      <div className="w-screen h-[26px] mb-8 pl-5 -ml-5 bg-gray-100">
        <span className="text-xs text-gray-600">
          최근 7일 동안의 기록을 볼 수 있어요.
        </span>
      </div>
      {Object.keys(groupedHistory).map((date) => (
        <HistoryList key={date} date={date} products={groupedHistory[date]} />
      ))}
    </div>
  );
};

export default History;
