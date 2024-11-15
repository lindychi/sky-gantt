import React from "react";

type Props = { text: string; jiraUrl?: string };

export default function IssueLinkSpan({ text, jiraUrl }: Props) {
  const replaceJiraLinks = (text: string) => {
    const regex = /#(\w+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(`#${part}`) && jiraUrl) {
        return (
          <span
            key={index}
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(
                `${jiraUrl}/${part}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return <div>{replaceJiraLinks(text)}</div>;
}
