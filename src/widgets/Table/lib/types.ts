import { IResponse, IKeysColumn } from 'app/lib/types';

export interface ITable {
  data: IResponse[];
  columns: IKeysColumn[];
}

export interface ISort {
  key: IKeysColumn;
  sorting: 'asc' | 'desc';
}

export interface IFilter {
  key: IKeysColumn;
  value: string;
}