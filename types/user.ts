export interface IMe {
  id: number;
  username: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export type TMe =
  | {
      id: number;
      username: string;
      user: {
        id: number;
        firstName: string;
        lastName: string;
      };
    }
  | undefined;
