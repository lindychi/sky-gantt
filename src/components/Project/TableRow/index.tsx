"use client";
import React from "react";

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
  upperItem?: DoItem;
  onAddItem?: (item: DoItem) => void;
  onRemoveItem?: (itemId: string) => void;
};

export default function ProjectTableRow({
  project,
  originItem,
  depth,
  upperItem,
  onAddItem,
  onRemoveItem,
}: Props) {
  const [item, setItem] = React.useState<DoItem | undefined>(originItem);
  const { user } = useAuth();
  const [addLow, setAddLow] = React.useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!user?.id) return;
    if (!project?.id) return;
    if (!item) return;

    if (e.key === "Enter") {
      const [result] = await addDoItem(user?.id, project?.id, item, upperItem);
      console.log("result", result);
      if (result) {
        console.log("result", result);
        onAddItem?.(result);
      }
      setItem({} as DoItem);
    }
  };

  const handleOpenAddLow = () => {
    setAddLow((prev) => !prev);
  };

  const handleRemoveItem = async () => {
    console.log(item, user?.id, project?.id);
    if (!item) return;
    if (!user?.id) return;
    if (!project?.id) return;

    console.log("removeItem", item);
    await removeItem(item);
    console.log("onRemoveItem", item.id);
    await onRemoveItem?.(item.id);
  };

  return (
    <>
      <TableRow key={item?.id}>
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
                  value={item.name ?? ""}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setItem({ ...item, name: e.target.value });
                  }}
                />
                {((depth > 0 && upperItem) || depth === 0) && item.id && (
                  <Button
                    onClick={handleOpenAddLow}
                    className="rounded-full p-1 min-w-10 min-h-10"
                  >
                    <Plus />
                  </Button>
                )}
                {item && (
                  <Button
                    onClick={handleRemoveItem}
                    className="rounded-full p-1 min-w-10 min-h-10"
                  >
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
          key={`${item.id}-${child.id}`}
          project={project}
          depth={depth + 1}
          upperItem={item}
          originItem={child}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
      {((depth > 0 && upperItem) || depth === 0) && addLow && (
        <ProjectTableRow
          key={`${item?.id}-new-row`}
          project={project}
          depth={depth + 1}
          upperItem={item}
          originItem={{} as DoItem}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}
    </>
  );
}
