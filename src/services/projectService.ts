import { supabase } from "@/supabase";

export const addProject = async (uid: string, projectName: string) => {
  const { data, error } = await supabase
    .from("projects")
    .insert({ user_id: uid, name: projectName })
    .select();
  if (error) {
    throw error;
  }

  return data;
};

export const getProject = async (pid: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", pid);
  if (error) {
    throw error;
  }

  return data;
};
