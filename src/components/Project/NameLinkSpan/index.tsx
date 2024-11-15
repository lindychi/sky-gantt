import React from "react";

type Props = { text: string; jiraUrl?: string };

export default function NameLinkSpan({ text, jiraUrl }: Props) {
  const replaceLink = (text: string) => {
    const regex = /(#[A-Za-z0-9-]+)|\[(.+?)\]\((https?:\/\/[^\s]+)\)/g; // # 또는 Markdown 링크 패턴

    const parts = [];
    let lastIndex = 0;

    // 텍스트에서 패턴 매칭
    text.replace(regex, (match, hash, linkText, linkUrl, offset) => {
      // 이전 텍스트 추가
      if (offset > lastIndex) {
        parts.push(text.slice(lastIndex, offset));
      }
      lastIndex = offset + match.length;

      // #으로 시작하는 경우
      if (hash && jiraUrl) {
        parts.push(
          <span
            key={`${offset}-hash`}
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(
                `${jiraUrl}/${hash.slice(1)}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            {hash}
          </span>
        );
      }

      // Markdown 링크 처리
      if (linkText && linkUrl) {
        parts.push(
          <span
            key={`${offset}-link`}
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(linkUrl, "_blank", "noopener,noreferrer");
            }}
          >
            {linkText}
          </span>
        );
      }

      return ""; // 필요 없는 반환값
    });

    // 마지막 텍스트 추가
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return <div>{replaceLink(text)}</div>;
}
