import { HTTP_METHOD } from "next/dist/server/web/http";
import Button from "./Button";

interface TableProps {
  method: HTTP_METHOD;
  url: string;
  description: string;
  body: string | React.ReactNode;
  status_response?: number | null;
  type_response?: string | null;
  description_response: string;
  body_response?: string | null;
}

export default function Table({
  method,
  url,
  description,
  body,
  status_response,
  type_response,
  description_response,
  body_response,
}: TableProps) {
  return (
    <div className="flex flex-col rounded-md border">
      <div className="flex items-center gap-2 border-b p-3">
        <Button className="rounded-md bg-blue-500 text-white disabled:bg-blue-500/80">
          {method}
        </Button>
        <div className="font-medium text-neutral-950">{url}</div>
        <div className="text-neutral-500">{description}</div>
      </div>
      <div className="p-3">{body}</div>
      {body_response && (
        <>
          <div className="flex items-center gap-2 border-t border-b p-3">
            {status_response && (
              <Button
                className={`${status_response == 200 ? "bg-green-500" : "bg-red-500"} rounded-md text-white`}
              >
                {status_response}
              </Button>
            )}
            {type_response && (
              <div className="font-medium text-neutral-950">
                {type_response}
              </div>
            )}
            <div className="text-neutral-500">{description_response}</div>
          </div>
          <pre className="overflow-auto rounded-md p-3 text-sm whitespace-pre-wrap">
            {body_response}
          </pre>
        </>
      )}
    </div>
  );
}
