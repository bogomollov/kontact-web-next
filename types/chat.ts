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
