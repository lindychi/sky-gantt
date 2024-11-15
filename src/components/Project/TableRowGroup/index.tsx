"use client";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import { MenuItem } from "@/types/common";
import { DoItem } from "@/types/project";

import { editDoItem, removeItem } from "@/services/projectService";

import { useAuth } from "@/components/Auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CornerDownRight, Ellipsis, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  project: MenuItem | null;
  originItem?: DoItem;
  depth: number;
  upperItem?: DoItem;
  onAddItem?: (item: DoItem) => void;
  onRemoveItem?: (itemId: string) => void;
  showCompleted?: boolean;
};

export default function ProjectTableRowGroup({
  project,
  originItem,
  depth,
  upperItem,
  onAddItem,
  onRemoveItem,
  showCompleted,
}: Props) {
  const [item, setItem] = useState<DoItem | undefined>(originItem);
  const prevData = useRef<DoItem | undefined>(item);
  const { user } = useAuth();
  const [addLow, setAddLow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hover, setHover] = useState(false);

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

  const handleCompleteItem = async () => {
    if (item) {
      await editDoItem({ ...item, progress: 100, children: undefined });
    } else {
      console.log("item is null");
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 한글 + 엔터의 오작동 개선(마지막 한글자 추가 작동)
      if (
        JSON.stringify(prevData.current) === JSON.stringify(item) ||
        prevData.current?.name?.includes(item?.name ?? "")
      ) {
        setItem({ name: "" } as DoItem);
        setEditMode(false);
        return;
      } else {
        prevData.current = item;
      }

      const itemIncludeUpperItem = {
        ...item,
        upper_item_id: upperItem?.id,
      } as DoItem;

      if (item?.id) {
        await editDoItem(itemIncludeUpperItem);
      } else {
        if (!item) return;
        if (!user?.id) return;
        if (!project?.id) return;
        onAddItem?.(itemIncludeUpperItem);
        setItem({ name: "" } as DoItem);
        setEditMode(false);
      }
    }
  };

  useEffect(() => {
    setItem(originItem);
  }, [originItem]);

  return (
    <>
      {(item?.progress !== 100 ||
        (item?.progress === 100 && showCompleted)) && (
        <>
          <TableRow
            className="h-[42px] py-0"
            key={
              item?.id
                ? item?.upper_item_id
                  ? `${item.upper_item_id}.${item.id}`
                  : item?.id
                : "new-item"
            }
          >
            <TableCell
              className="max-w-[600px] py-[9px] flex"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div style={{ paddingLeft: 16 * depth }} className="w-full">
                {!item ? (
                  <Button
                    className="rounded-full p-1 max-w-6 max-h-6"
                    onClick={() => {
                      setItem({} as DoItem);
                    }}
                  >
                    <Plus />
                  </Button>
                ) : (
                  <div className="flex items-center gap-1 justify-between">
                    <div className="flex items-center gap-1">
                      {depth > 0 && <CornerDownRight size={12} />}
                      {!item?.id || editMode ? (
                        <Input
                          type="text"
                          value={item.name ?? ""}
                          onKeyDown={handleKeyDown}
                          onChange={(e) => {
                            setItem({ ...item, name: e.target.value });
                          }}
                          className="h-[32px]"
                        />
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </div>
                    <div
                      className={cn("flex gap-1 items-center transition-all", {
                        "opacity-100": hover,
                        "opacity-0": !hover,
                      })}
                    >
                      {((depth > 0 && upperItem) || depth === 0) && item.id && (
                        <Button
                          onClick={handleOpenAddLow}
                          className="rounded-full p-1 max-w-6 max-h-6"
                        >
                          <Plus />
                        </Button>
                      )}
                      {item && item.id && (
                        <Button
                          onClick={handleRemoveItem}
                          className="rounded-full p-1 max-w-6 max-h-6"
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell className="py-0">{item?.plan_started}</TableCell>
            <TableCell className="py-0">{item?.plan_ended}</TableCell>
            <TableCell className="py-0">{item?.actual_started}</TableCell>
            <TableCell className="py-0">{item?.actual_ended}</TableCell>
            <TableCell className="py-0">{item?.progress}</TableCell>
            <TableCell className="py-0">{item?.assignee}</TableCell>
            <TableCell className="py-0">
              {item?.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={12} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(item?.progress ?? 0) < 100 && (
                      <DropdownMenuItem onClick={handleCompleteItem}>
                        완료
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
          {item?.children?.map((child) => (
            <ProjectTableRowGroup
              key={child.id}
              project={project}
              depth={depth + 1}
              upperItem={item}
              originItem={child}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
              showCompleted={showCompleted}
            />
          ))}
          {((depth > 0 && upperItem) || depth === 0) && addLow && (
            <ProjectTableRowGroup
              key={`${item?.id}-new-row`}
              project={project}
              depth={depth + 1}
              upperItem={item}
              originItem={{} as DoItem}
              onAddItem={(item) => {
                onAddItem?.(item);
                setAddLow(false);
              }}
              onRemoveItem={onRemoveItem}
            />
          )}
        </>
      )}
    </>
  );
}
