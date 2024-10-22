"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { DoItem } from "@/types/project";
import { MenuItem } from "@/types/common";

import { convertToHierarchy } from "@/lib/hierarchy";

import { getItemList, getProject } from "@/services/projectService";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectTableRow from "@/components/Project/TableRow";

type Props = {};

export default function ProjectDetail({}: Props) {
  const { pid } = useParams();
  const [project, setProject] = React.useState<MenuItem | null>(null);
  const [itemList, setItemList] = React.useState<DoItem[] | null>(null);
  const [hierarchyList, setHierarchyList] = React.useState<DoItem[] | null>(
    null
  );
  const [showCompleted, setShowCompleted] = React.useState(false);

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
        setItemList(result);
      } else {
        console.log(result);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleAddItem = (item: DoItem) => {
    console.log("handleAddItem", item);
    setItemList((prev) => {
      return [...(prev ?? []), item];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    console.log(
      "handleRemoveItem",
      itemId,
      itemList?.length,
      itemList?.filter((i) => i.id !== itemId).length
    );
    setItemList((prev) => {
      return prev?.filter((i) => i.id !== itemId) ?? [];
    });
  };

  useEffect(() => {
    if (itemList && itemList.length > 0) {
      console.log("hierarchy rerender", itemList);
      setHierarchyList(convertToHierarchy(itemList, "id", "upper_item_id"));
    }
  }, [itemList]);

  useEffect(() => {
    loadItemList();
  }, [project]);

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1>Project ID: {project?.name}</h1>
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
            <ProjectTableRow
              key={item.id}
              originItem={item}
              project={project}
              depth={0}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              showCompleted={showCompleted}
            />
          ))}
          <ProjectTableRow
            key={"new_row"}
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
