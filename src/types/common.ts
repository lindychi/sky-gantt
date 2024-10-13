interface MenuItem {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  id: string;
  user_id: string;
  created_at: string;
}

interface LNBProps {
  menuList: MenuItem[];
}
