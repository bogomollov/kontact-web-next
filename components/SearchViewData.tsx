import Image from "next/image";
import Link from "next/link";

interface FindData {
    id: number;
    username: string;
    email: string;
    user: {
        firstName: string;
        lastName: string;
        middleName?: string | null;
    };
}

interface SearchViewDataProps {
    data: FindData[];
}

export function SearchViewData({ data }: SearchViewDataProps) {
    if (!data || data.length === 0) {
        return;
    }

    return (
        <div className="flex flex-col gap-[8px] p-3 rounded-[10px]">
            {data.map((account: FindData) => (
                <Link href={`/dashboard/${account.id}`} key={account.id} className="flex items-center gap-[15px]">
                    <div className="relative">
                        <Image src={"/avatars/" + account.id + ".svg"} alt={`avatar ${account.id}`} width={50} height={50} />
                        <div className="absolute bottom-1 right-1 rounded-full border border-white bg-blue-500 w-[12px] h-[12px]"></div>
                    </div>
                    <div className="flex flex-col">
                        <h5>{account.user.firstName} {account.user.lastName}</h5>
                        <p className="text-blue-500 text-base cursor-pointer">@{account.username}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}