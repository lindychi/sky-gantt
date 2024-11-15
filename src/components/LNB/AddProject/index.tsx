"use client";
import React from "react";

import { supabase } from "@/supabase";

import { addProject } from "@/services/projectService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

export default function AddProject({}: Props) {
  const [projectName, setProjectName] = React.useState("");

  const handleAddProject = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return;
    }

    try {
      console.log(data);
      addProject(data.user.id, projectName);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <Input
        id="project"
        type="text"
        placeholder="프로젝트 이름"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Button
        onClick={handleAddProject}
        className="rounded-full p-1 min-w-6 max-h-6"
        disabled={projectName.length === 0}
      >
        +
      </Button>
    </div>
  );
}
