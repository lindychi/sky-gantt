import React from "react";

import { cn } from "@/lib/utils";

type Props = { valueList: number[]; total: number };

export default function IssueProgress({ valueList, total }: Props) {
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-secondary">
      {valueList.map((value, index, valueList) => (
        <div
          key={index}
          style={{
            width: `${(value / total) * 100}%`,
            left: `${(valueList[index - 1] / total) * 100}%`,
          }}
          className={cn("absolute h-full bg-primary", {
            "bg-green-500": index === 0,
            "bg-blue-500": index === 1,
          })}
        />
      ))}
    </div>
  );
}
