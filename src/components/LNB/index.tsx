import React from "react";
import AddProject from "./AddProject";
import LNBProjectItem from "./ProjectItem";

const LNB: React.FC<LNBProps> = ({ menuList }) => {
  return (
    <div className="flex flex-col">
      <AddProject />
      {menuList.map((menu, index) => (
        <LNBProjectItem key={index} menu={menu} />
      ))}
    </div>
  );
};

export default LNB;
