import { supabase } from "@/supabase";
import { DoItem } from "@/types/project";

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

export const addDoItem = async (uid: string, pid: string, doItem: DoItem) => {
  const { data, error } = await supabase
    .from("project_items")
    .insert({
      ...doItem,
      user_id: uid,
      project_id: pid,
    })
    .select();
  if (error) {
    throw error;
  }

  return data;
};

export const editDoItem = async (doItem: DoItem) => {
  const { data, error } = await supabase
    .from("project_items")
    .update(doItem)
    .eq("id", doItem.id)
    .select();
  if (error) {
    throw error;
  }

  return data;
};

export const getItemList = async (pid: string): Promise<DoItem[]> => {
  const { data, error } = await supabase
    .from("project_items")
    .select("*")
    .eq("project_id", pid)
    .order("created_at"); // created_at 최신순 정렬
  if (error) {
    throw error;
  }

  return data;
};

export const removeItem = async (item: DoItem) => {
  const { data, error } = await supabase
    .from("project_items")
    .delete()
    .eq("id", item.id);
  if (error) {
    throw error;
  }

  return data;
};
