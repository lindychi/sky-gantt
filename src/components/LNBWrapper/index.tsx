import React from "react";
import LNB from "../LNB";
import {
  getPermissionList,
  getPermissionProjectList,
} from "@/services/projectService";
import { createClient } from "@/libs/supabase/server";

type Props = {};

export default async function LNBWrapper({}: Props) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  let permissionList: any[] = [];
  let projectList: any[] = [];
  if (user.data.user?.id) {
    permissionList = (await getPermissionList(user.data.user?.id)) ?? [];
  }
  const { data, error } = await getPermissionProjectList(
    permissionList?.map((permission) => permission.project_id) ?? []
  );
  projectList = data ?? [];

  console.log(user);

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (projectList.length === 0) {
    return <div>{user.data.user?.id}</div>;
  }

  return <LNB menuList={projectList} />;
}
