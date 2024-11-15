"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { MenuItem } from "@/types/common";

type Props = { menu: MenuItem };

export default function LNBProjectItem({ menu }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === `/project/${menu.id}`;

  const handleMenuClick = () => {
    router.push(`/project/${menu.id}`);
  };

  return (
    <div
      className={cn(
        "flex items-center p-2 transition-all rounded cursor-pointer",
        {
          "bg-background brightness-200 font-bold": isActive,
          "text-white bg-background hover:brightness-200 hover:font-bold":
            !isActive,
        }
      )}
      onClick={handleMenuClick}
    >
      {menu.icon}
      <span className="ml-2">{menu.name}</span>
    </div>
  );
}
