export interface IMe {
  id: number;
  username: string;
  email: string;
  phone: string;
  role_id: number;
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
      email: string;
      phone: string;
      role_id: number;
      user: {
        id: number;
        firstName: string;
        lastName: string;
      };
    }
  | undefined;
