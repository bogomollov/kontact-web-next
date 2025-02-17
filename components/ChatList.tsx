'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image';

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

interface ChatListProps {
    items: User[];
}

export default function ChatList({ items }: ChatListProps) {
    const pathname = usePathname()

    return (
        <>
            {items ?
                <div className='flex flex-col px-[20px] py-[15px]'>
                    {items.map((chat: User) => (
                        <Link href={`/dashboard/${chat.id}`} scroll={false} key={chat.id} className={`inline-flex items-center gap-[15px] rounded-[15px] px-[20px] py-[10px] ${pathname === `/dashboard/${chat.id}` ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}>
                            <Image src={"/avatars/" + chat?.id + '.svg'} alt='' width={55} height={55} />
                            <h5>{chat.firstName} {chat.lastName}</h5>
                        </Link>
                    ))}
                </div> : <p className='text-neutral-500'>У вас нету чатов</p>
            }
        </>
    )
}