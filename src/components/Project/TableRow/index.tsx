"use client";
import React from "react";
import { mutate } from "swr";

import { MenuItem } from "@/types/common";
import { DoItem } from "@/types/project";

import { addDoItem, removeItem } from "@/services/projectService";

import { useAuth } from "@/components/Auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

import { Plus, X } from "lucide-react";

type Props = {
  project: MenuItem | null;
  originItem?: DoItem;
  depth: number;
  upperItem: DoItem | null;
};

export default function ProjectTableRow({
  project,
  originItem,
  depth,
  upperItem,
}: Props) {
  const [item, setItem] = React.useState<DoItem | null>(originItem ?? null);
  const { user } = useAuth();
  const [addLow, setAddLow] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!user?.id) return;
    if (!project?.id) return;
    if (!item) return;

    if (e.key === "Enter") {
      addDoItem(user?.id, project?.id, item);
    }
  };

  const handleOpenAddLow = () => {
    setAddLow((prev) => !prev);
  };

  const handleRemoveItem = async () => {
    if (!item) return;
    if (!user?.id) return;
    if (!project?.id) return;

    await removeItem(item);
    mutate("project_items");
  };

  return (
    <>
      <TableRow>
        <TableCell className="max-w-[300px]">
          <div style={{ paddingLeft: 16 * depth }}>
            {!item ? (
              <Button
                onClick={() => {
                  setItem({} as DoItem);
                }}
              >
                <Plus />
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <Input
                  type="text"
                  value={item.name}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setItem({ ...item, name: e.target.value });
                  }}
                />
                {((depth > 0 && upperItem) || depth === 0) && item.id && (
                  <Button onClick={handleOpenAddLow}>
                    <Plus />
                  </Button>
                )}
                {item && (
                  <Button onClick={handleRemoveItem}>
                    <X />
                  </Button>
                )}
              </div>
            )}
          </div>
        </TableCell>
        <TableCell>{item?.plan_started}</TableCell>
        <TableCell>{item?.plan_ended}</TableCell>
        <TableCell>{item?.actual_started}</TableCell>
        <TableCell>{item?.actual_ended}</TableCell>
        <TableCell>{item?.progress}</TableCell>
        <TableCell>{item?.assignee}</TableCell>
        <TableCell></TableCell>
      </TableRow>
      {item?.children?.map((child) => (
        <ProjectTableRow
          key={child.id}
          project={project}
          depth={depth + 1}
          upperItem={item}
          originItem={child}
        />
      ))}
      {((depth > 0 && upperItem) || depth === 0) && addLow && (
        <ProjectTableRow
          project={project}
          depth={depth + 1}
          upperItem={item}
          originItem={{} as DoItem}
        />
      )}
    </>
  );
}
