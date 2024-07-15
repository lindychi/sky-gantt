import React from "react";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

interface LNBProps {
  menuList: MenuItem[];
}

const LNB: React.FC<LNBProps> = ({ menuList }) => {
  return (
    <div className="flex flex-col">
      {menuList.map((menu, index) => (
        <div
          key={index}
          className={`flex items-center p-2 ${
            menu.active ? "bg-gray-200 rounded" : "bg-black text-white"
          }`}
        >
          {menu.icon}
          <span className="ml-2">{menu.name}</span>
        </div>
      ))}
    </div>
  );
};

export default LNB;
