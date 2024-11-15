import React from "react";

import { LNBProps } from "@/types/common";

import AddProject from "@/components/LNB/AddProject";
import LNBProjectItem from "@/components/LNB/ProjectItem";

const LNB: React.FC<LNBProps> = ({ menuList }) => {
  return (
    <div className="flex flex-col gap-1">
      <AddProject />
      {menuList.map((menu, index) => (
        <LNBProjectItem key={index} menu={menu} />
      ))}
    </div>
  );
};

export default LNB;
