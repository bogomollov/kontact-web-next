import { useState } from "react";

export default function API() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Ошибка при запросе");
    }
    setLoading(false);
  };

  return (
    <div id="api" className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Тест API</h2>
      <button
        onClick={fetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? "Загрузка..." : "Отправить запрос"}
      </button>
      {response && (
        <pre className="mt-4 p-2 bg-gray-100 border rounded-md overflow-auto">
          {response}
        </pre>
      )}
    </div>
  );
};