import React from "react";
import LNB from "../LNB";
import { supabase } from "@/supabase";

type Props = {};

export default async function LNBWrapper({}: Props) {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return <LNB menuList={data} />;
}
