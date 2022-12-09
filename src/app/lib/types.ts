export interface IResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  website: string;
}

export type IKeysColumn = keyof IResponse