import { FC } from 'react';

import Column from 'widgets/Column';
import { ITable } from './lib/types';
import useTable from './model/useTable';

const Table: FC<ITable> = ({ data, columns }) => {
  const { sortedData, ...props } = useTable({ data, columns });

  return (
    <table className='border border-separate table-auto select-none min-w-min border-slate-500'>
      <thead>
        <Column columns={columns} {...props} />
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column + row.id} className='p-2 border border-slate-600'>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
