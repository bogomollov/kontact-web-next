"use client";

import { ChatType } from "@prisma/client";

type ChatListItem = {
  id: number;
  type: ChatType;
  members: {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      middleName: string;
      department_id: number | null;
      position_id: number | null;
      updatedAt: Date;
      deletedAt: Date | null;
    };
    role_id: number;
    joinedAt: Date;
  }[];
  messages: {
    id: number;
    content: string;
    createdAt: Date;
  }[];
};

interface ChatListProps {
  items: ChatListItem[];
}

export default function GroupList({ items }: ChatListProps) {
  return (
    <div>
      {items.map((chat) => (
        <div key={chat.id}>
          <p>
            Участники группы:{" "}
            {chat.members
              .map((m) => `${m.user.firstName} ${m.user.lastName}`)
              .join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
