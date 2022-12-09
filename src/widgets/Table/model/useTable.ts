import { IKeysColumn } from 'app/lib/types';
import { useState, useMemo } from 'react';
import { IFilter, ISort, ITable } from '../lib/types';

const useTable = ({ columns, data }: ITable) => {
  const [sort, setSort] = useState<ISort>({ key: 'id', sorting: 'asc' });
  const [filters, setFilter] = useState<IFilter[]>([
    ...columns.map((col) => ({ key: col, value: '' })),
  ]);

  const filteredData = useMemo(() => [...data].filter((row) => {
    return (Object.keys(row) as IKeysColumn[]).every((key) => {
      const filter = filters.find((keyFilters) => key === keyFilters.key);
      const filterValue = filter?.value.replace(/\*|\+|\\|\(|\)|\?/g, (ch) => `\\${ch}`);

      if (!filterValue?.length) {
        return true
      }

      return RegExp(filterValue, 'i').test(String(row[key]));
    });
  }),
    [data, filters]
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const itemA = a[sort.key];
    const itemB = b[sort.key];

    if (typeof itemA === 'string' && typeof itemB === 'string') {
      return sort.sorting === 'asc' ? itemA.localeCompare(itemB) : itemB.localeCompare(itemA);
    }

    if (typeof itemA === 'number' && typeof itemB === 'number') {
      return sort.sorting === 'asc' ? itemA - itemB : itemB - itemA;
    }

    return 0;
  });

  const handleSort = (column: IKeysColumn, sort: ISort) => () => {
    const toggleSort = sort.sorting === 'asc' ? 'desc' : 'asc'
    const sorting = column === sort.key ? toggleSort : 'asc';
    setSort({ key: column, sorting });
  };

  const handleChange = (column: IKeysColumn) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter([...filters.map((item: IFilter) => {
      if (column === item.key) {
        item.value = e.target.value;
      }
      return item;
    }),
    ]);
  };

  return { handleSort, handleChange, sortedData, sort, filters }
}

export default useTable