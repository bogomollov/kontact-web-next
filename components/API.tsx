import { useState } from "react";
import Table from "./ui/Table";

export default function API() {
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/search?query=Виктор");
      const data = await res.json();
      setResponse({data: data, status: res.status});
    } catch (error) {
      return false;
    }
    setLoading(false);
  };

  return (
    <div id="api" className="flex items-center justify-between w-full mx-auto">
      <div className="flex flex-col gap-[25px] items-start">
        <div className="flex flex-col gap-[15px]">
        <h2>Взаимодействие через сеть</h2>
        <h4>Используйте API для автоматизации задач</h4>
        </div>
        <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {loading ? "Получение ответа..." : "Отправить запрос"}
      </button>
      </div>
      <Table method="GET" url="/api/search?" description="поиск сотрудника"
      body={
        <>
          <span className="text-blue-500">GET /api/search?query=Виктор HTTP/1.1</span><br />
          Authorization: <span>Bearer Pm7gdycNeHV_F1y4_tjWWIutC0Aq0gwl9wRnX-KBuHw</span><br />
          Content-Type: <span>application/json; charset=utf-8</span><br />
          Connection: <span className="text-blue-500">close</span><br />
          User-Agent: <span className="text-blue-500">Mozilla/5.0 (Windows NT 10.0; Win64; x64)</span>
        </>
      }
      status_response={response?.status}
      type_response="body"
      description_response="ответ сервера"
      body_response={response?.data}
      />
      </div>
  );
};