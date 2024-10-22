import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuItem } from "@/types/common";

import LNB from "./index";

describe("LNB 컴포넌트", () => {
  const menuList: MenuItem[] = [
    {
      name: "Home",
      icon: <svg data-testid="home-icon" />,
      active: true,
    },
    {
      name: "Profile",
      icon: <svg data-testid="profile-icon" />,
      active: false,
    },
    {
      name: "Settings",
      icon: <svg data-testid="settings-icon" />,
      active: false,
    },
  ];

  test("메뉴 항목이 올바르게 렌더링 되는지", () => {
    render(<LNB menuList={menuList} />);

    // 메뉴 항목들이 렌더링 되는지 확인
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // 아이콘들이 렌더링 되는지 확인
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("profile-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  test("활성화된 메뉴 항목과 비활성화된 메뉴 항목에 올바른 스타일이 적용되는지", () => {
    render(<LNB menuList={menuList} />);

    const homeMenuItem = screen.getByText("Home").closest("div");
    const profileMenuItem = screen.getByText("Profile").closest("div");
    const settingsMenuItem = screen.getByText("Settings").closest("div");

    // 활성화된 메뉴 항목에 올바른 스타일이 적용되는지 확인
    expect(homeMenuItem).toHaveClass("bg-gray-200 rounded");

    // 비활성화된 메뉴 항목에 올바른 스타일이 적용되는지 확인
    expect(profileMenuItem).toHaveClass("bg-black text-white");
    expect(settingsMenuItem).toHaveClass("bg-black text-white");
  });
});
