import { IResponse } from 'app/lib/types';
import { useState, useEffect, useCallback } from 'react';

const useApp = (json: string) => {
  const [data, setData] = useState<IResponse[]>([]);
  const getData = useCallback(async () => {
    const resp = await fetch(json);  // Любой массив объектов без вложенности объектов друг в друга
    if (!resp.ok) return;

    const data = (await resp.json()) as IResponse[]; // также необходимо поправить их интерфейс для TS
    setData(data);
  }, [json]);

  useEffect(() => {
    getData();
  }, [getData]);

  return data;
}

export default useApp;