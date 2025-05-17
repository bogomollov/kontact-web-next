"use client";
import { useState, useCallback } from "react";
import Table from "./ui/Table";
import { apiFetch } from "@/lib/apiFetch";
import { ApiResponse } from "@/types";

export default function API() {
  const [response, setResponse] = useState<ApiResponse>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/users/search?query=Виктор", {
        credentials: "include",
      });
      const data = await res.json();
      setResponse({ data, status: res.status });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div id="api" className="mx-auto flex w-full items-center justify-between">
      <div className="flex flex-col items-start gap-9">
        <div className="flex flex-col gap-4">
          <h2>Взаимодействие через сеть</h2>
          <h4 className="text-neutral-500">
            Используйте API для автоматизации задач
          </h4>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Получение ответа..." : "Отправить запрос"}
        </button>
      </div>

      <Table
        method="GET"
        url="/api/chats/search?"
        description="поиск сотрудника"
        body={
          <>
            <span className="text-blue-500">
              GET /api/search?query=Виктор HTTP/1.1
            </span>
            <br />
            <div className="flex gap-[8px]">
              Authorization:
              <span className="flex gap-[8px] text-blue-500">
                Bearer ******************
              </span>
            </div>
            <div className="flex gap-[8px]">
              Content-Type:
              <span className="text-blue-500">
                application/json; charset=utf-8
              </span>
            </div>
            <div className="flex gap-[8px]">
              Connection: <span className="text-blue-500">close</span>
            </div>
            <div className="flex gap-[8px]">
              User-Agent:  
              <span className="text-blue-500">
                Mozilla/5.0 (Windows NT 10.0; Win64; x64)
              </span>
            </div>
          </>
        }
        status_response={response.status}
        type_response="body"
        description_response="ответ сервера"
        body_response={
          response.error ??
          (response.data ? JSON.stringify(response.data, null, 2) : null)
        }
      />
    </div>
  );
}
