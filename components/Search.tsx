'use client'

import { useState } from "react";
import InputSearch from "./ui/InputSearch";
import { SearchViewData } from "./SearchViewData";

export function Search() {
  const [data, setData] = useState([]);

  const handleData = async (data: any) => {
    setData(data.data);
  }

  return (
    <div className="px-[20px]">
      <InputSearch
        searchUrl="search"
        callbackData={handleData}
        className="inline-flex focus:outline-blue-500 w-full border pl-[55px] pr-[20px] py-[12px] rounded-[10px]"
        placeholder="Поиск пользователей"
      />
      <SearchViewData data={data} />
    </div>
  );
}