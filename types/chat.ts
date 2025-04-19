import { IUser } from "./user";

export interface IChatSearchListItem {
  id: number;
  name: string;
  image?: string;
  chat_id: number;
}

export interface IChatListItem {
  id: number;
  type: "private" | "group";
  name: string;
  image?: string;
  unreadCount: number;
}

export type TChatListItem = {
  id: number;
  type: "private" | "group";
  name: string;
  image?: string;
  unreadCount: number;
};

export interface IChat {
  id: number;
  type: "private" | "group";
  name: string;
  image?: string;
  membersCount?: number;
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  chat_id: number;
  sender_id: number;
  content: string;
  isRead: boolean;
  createdAt: Date;
  sender: IUser;
}
