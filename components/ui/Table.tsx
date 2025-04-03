import { HTTP_METHOD } from "next/dist/server/web/http"
import Button from "./Button"

interface TableProps {
    method: HTTP_METHOD,
    url: string,
    description: string,
    body: string | React.ReactNode,
    status_response?: number | null,
    type_response?: string | null,
    description_response: string,
    body_response?: string | null,
}


export default function Table({ method, url, description, body, status_response, type_response, description_response, body_response }: TableProps) {
    return (
        <div className="flex flex-col border rounded-md max-w-[666px] font-mono">
            <div className="flex items-center gap-2 border-b-1 p-3">
                <Button className="text-white bg-blue-500 disabled:bg-blue-500/80 rounded-md">{method}</Button>
                <div className="text-neutral-950 font-medium">{url}</div>
                <div className="text-neutral-500">{description}</div>
            </div>

            <div className="p-3">
                {body}
            </div>
            {body_response &&
                <>
                    <div className="flex items-center gap-2 border-t-1 border-b-1 p-3">
                        <Button className="text-white bg-green-500 rounded-md">{status_response}</Button>
                        <div className="text-neutral-950 font-medium">{type_response}</div>
                        <div className="text-neutral-500">{description_response}</div>
                    </div>
                    <pre className="p-3 overflow-auto">
                        {JSON.stringify(body_response, null, 2)}
                    </pre>
                </>
            }
        </div>
    )
}