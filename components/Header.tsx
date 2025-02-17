import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between px-[240px] py-2.5 border border-b-neutral-200">
            <Link href="/">
                <div className="flex items-center gap-[5px]">
                    <h3>контакт</h3>
                    <div className="text-base text-neutral-500 bg-neutral-200 px-[6px] rounded-[5px]">веб</div>
                </div>
            </Link>
            <Link href="/login" className="inline-flex px-4 py-2 rounded-md text-white bg-blue-500">Начать общение</Link>
        </div>
    )
}