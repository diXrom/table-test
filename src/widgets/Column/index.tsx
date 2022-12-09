import { FC } from 'react';
import { IKeysColumn, IResponse } from 'app/lib/types';
import { IFilter, ISort } from 'widgets/Table/lib/types';

interface IColumn {
  columns: IKeysColumn[];
  sort: ISort;
  filters: IFilter[];
  handleChange: (column: keyof IResponse) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSort: (column: keyof IResponse, sort: ISort) => () => void;
}

const Column: FC<IColumn> = ({ columns, sort, filters, handleSort, handleChange }) => (
  <tr className='bg-slate-200'>
    {columns.map((column) => (
      <th className='border border-slate-600' key={column}>
        <div
          className='flex justify-between gap-3 p-2 cursor-pointer'
          onClick={handleSort(column, sort)}
        >
          <div>{column.replace(/./, (ch) => ch.toUpperCase())}</div>
          {sort.key === column && <div>{sort.sorting === 'asc' ? '△' : '▽'}</div>}
        </div>
        <div className='px-2 pb-2 font-normal'>
          <input
            value={filters.find((item) => column === item.key)?.value}
            onChange={handleChange(column)}
            type='text'
            className='w-full p-1 font-normal'
            placeholder='Filter'
          />
        </div>
      </th>
    ))}
  </tr>
);

export default Column;
