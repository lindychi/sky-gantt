"use client";

import React from "react";

import { useRouter } from "next/navigation";

type Props = { menu: MenuItem };

export default function LNBProjectItem({ menu }: Props) {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push(`/project/${menu.id}`);
  };

  return (
    <div
      className={`flex items-center p-2 ${
        menu.active ? "bg-gray-200 rounded" : "bg-black text-white"
      }`}
      onClick={handleMenuClick}
    >
      {menu.icon}
      <span className="ml-2">{menu.name}</span>
    </div>
  );
}
