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
import ProjectTableRow from "@/components/Project/TableRow";

type Props = {};

export default function ProjectDetail({}: Props) {
  const { pid } = useParams();
  const [project, setProject] = React.useState<MenuItem | null>(null);
  const [itemList, setItemList] = React.useState<DoItem[] | null>(null);

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
        console.log(result);
        setItemList(convertToHierarchy(result, "id", "upper_item_id"));
      } else {
        console.log(result);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadItemList();
  }, [project]);

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="p-5">
      <h1>Project ID: {project?.name}</h1>
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
          {itemList?.map((item) => (
            <ProjectTableRow
              key={item.id}
              originItem={item}
              project={project}
              depth={0}
              upperItem={null}
            />
          ))}
          <ProjectTableRow project={project} depth={0} upperItem={null} />
        </TableBody>
      </Table>
    </div>
  );
}
