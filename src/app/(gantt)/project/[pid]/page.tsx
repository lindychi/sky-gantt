"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { DoItem } from "@/types/project";
import { MenuItem } from "@/types/common";

import { convertToHierarchy } from "@/lib/hierarchy";

import {
  addDoItem,
  editDoItem,
  getItemList,
  getProject,
} from "@/services/projectService";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectTableRowGroup from "@/components/Project/TableRowGroup";
import { useAuth } from "@/components/Auth/AuthGuard";

type Props = {};

export default function ProjectDetail({}: Props) {
  const { pid } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState<MenuItem | null>(null);
  const itemList = useRef<DoItem[] | null>(null);
  const [hierarchyList, setHierarchyList] = useState<DoItem[] | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const loadProject = async () => {
    const targetPid = pid as string;

    try {
      const result = await getProject(targetPid);
      if (result.length > 0) {
        setProject(result[0]);
      } else {
        console.log(result);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const loadItemList = async () => {
    if (!project || !project.id) return;

    try {
      const result = await getItemList(project.id);
      if (result && result.length > 0) {
        itemList.current = result;
        setHierarchyList(
          convertToHierarchy(itemList.current, "id", "upper_item_id")
        );
      } else {
        console.log(result);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleAddItem = async (item: DoItem) => {
    if (!user || !project || !project.id) return;

    try {
      const [newItem] = await addDoItem(user?.id, project?.id, item);
      itemList.current = [...(itemList.current ?? []), newItem];
      setHierarchyList(
        convertToHierarchy(itemList.current, "id", "upper_item_id")
      );
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleEditItem = async (item: DoItem) => {
    try {
      const [newItem] = await editDoItem(item);

      itemList.current =
        itemList.current?.map((i) => (i.id === item.id ? newItem : i)) ?? [];
      setHierarchyList(
        convertToHierarchy(itemList.current, "id", "upper_item_id")
      );
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    itemList.current = itemList?.current?.filter((i) => i.id !== itemId) ?? [];
    setHierarchyList(
      convertToHierarchy(itemList.current, "id", "upper_item_id")
    );
  };

  useEffect(() => {
    loadItemList();
  }, [project]);

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{project?.name}</h1>
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Checkbox
              id="show-completed"
              checked={showCompleted}
              onClick={() => {
                setShowCompleted((prev) => !prev);
              }}
            />
            <label htmlFor="show-completed">완료된 항목 표시</label>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>업무</TableHead>
            <TableHead>계획시작일</TableHead>
            <TableHead>계획종료일</TableHead>
            <TableHead>실제시작일</TableHead>
            <TableHead>실제종료일</TableHead>
            <TableHead>진척률</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hierarchyList?.map((item) => (
            <ProjectTableRowGroup
              key={item.id}
              originItem={item}
              project={project}
              depth={0}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onEditItem={handleEditItem}
              showCompleted={showCompleted}
            />
          ))}
          <ProjectTableRowGroup
            key={"root-new-row"}
            project={project}
            depth={0}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        </TableBody>
      </Table>
    </div>
  );
}
