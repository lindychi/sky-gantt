"use client";

import React, { useEffect } from "react";

import { useParams } from "next/navigation";
import { getProject } from "@/services/projectService";

type Props = {};

export default function ProjectDetail({}: Props) {
  const { pid } = useParams();
  const [project, setProject] = React.useState<MenuItem | null>(null);

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

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="p-5">
      <h1>Project ID: {project?.name}</h1>
    </div>
  );
}
